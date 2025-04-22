import os
import time
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain_huggingface import HuggingFaceEmbeddings

from itertools import chain
from final_img_pros import processing

# Load environment variables
load_dotenv()

groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama3-70b-8192")
embeddings = HuggingFaceEmbeddings(model_name="embeddings_model")

def get_embeddings():
    return embeddings

# Prompts

summary_prompt = ChatPromptTemplate.from_template(
    """
    You are an expert medical professional tasked with creating a concise yet comprehensive summary of a medical document.
    Your summary must be factually accurate, clinically relevant, and organized in a way that highlights key information.
    SUMMARY FORMAT:
    1. Begin with 1-2 sentence overview of the document's key content
    2. Organize the remaining information into clinically relevant sections
    3. Use concise, clear language
    4. Include specific values, measurements, and dates where provided
    5. Focus more on the dates and mention dates
    6. Total length should be approximately 150-200 words depending on document complexity

    <context>
    {context}
    </context>
    """
)

history_prompt = ChatPromptTemplate.from_template(
    """
    You are an expert medical professional creating a comprehensive summary of a patient's medical history based on document summaries and patient information. Your goal is to produce a medically accurate, chronologically organized narrative that would help a new physician quickly understand this patient's medical journey.

    PATIENT INFORMATION:
    {patient_info}

    DOCUMENT SUMMARIES:
    {context}

    INSTRUCTIONS FOR COMPREHENSIVE SUMMARY:
    1. First, carefully review and extract all information from the PATIENT INFORMATION section. This contains verified demographic details, known conditions, and background that must be accurately represented.
    
    2. Create a chronological timeline of the patient's medical events using date information from document summaries. Sort all documents by their dates (DD/MM/YYYY format) before synthesizing the information.
    
    3. Organize your summary into these mandatory sections:
       - **Demographics and Background**: Accurately state patient's name, age (calculate from DOB), gender, occupation, height, weight, blood group, and lifestyle factors exactly as provided in PATIENT INFORMATION.
       - **Chief Complaints and Present Illness**: Identify the primary medical issues and their progression over time.
       - **Past Medical History**: Include all conditions mentioned in patient information and document summaries.
       - **Medications**: Document all medications mentioned, with dates when they were prescribed or changed.
       - **Allergies**: List all allergies exactly as stated in patient information.
       - **Surgical History and Procedures**: Detail all surgical procedures with exact dates.
       - **Laboratory and Diagnostic Findings**: Organize test results chronologically, noting abnormal values and trends.
       - **Assessment and Diagnoses**: Summarize diagnoses from most recent to earliest.
       - **Treatment Plan and Recommendations**: Include all treatment recommendations with their dates. Do not emphasis much on treatment plans that are old.
       
    4. For each document summary, extract:
       - The document type (e.g., "Blood test Report", "Imaging Report")
       - The exact date in DD/MM/YYYY format
       - All significant findings, results, or clinical notes
       - Any diagnoses, treatments, or recommendations
       
    5. When integrating information:
       - Maintain strict chronological order within each section
       - Include specific dates for all events, tests, and procedures
       - Note significant changes in test results or clinical status over time
       - Preserve medical terminology and specific values/measurements
       - Identify connections between different findings and their clinical significance
       
    6. If information is truly not available for a section despite being in patient information or document summaries, only then state "Not documented."

    7. Use the patient's actual age (calculated from date of birth) and current year (2025).
    
    8. Include a brief conclusion summarizing the patient's current status and key medical concerns.

    COMPREHENSIVE SUMMARY:
    """
)

chatbot_prompt = ChatPromptTemplate.from_template(
    """
    You are a medical chatbot designed to assist users by providing accurate and personalized responses based on a patient's medical records and inquiries. Your responses should be factually correct, concise, and user-friendly.

    PATIENT INFORMATION:
    {patient_info}

    USER QUERY:
    {query}

    DOCUMENTS:
    You have access to the following patient documents:
    {context}

    INSTRUCTIONS FOR RESPONSE:
    1. Carefully review the USER QUERY and identify the specific information being requested.
    2. Search through the DOCUMENTS provided to extract relevant information that addresses the query. Use document metadata (e.g., type, date) to prioritize contextually relevant documents.
    3. Cross-reference the extracted information with PATIENT INFORMATION to ensure the response is personalized and clinically accurate.
    4. Provide a concise, clear answer or recommendation based on the extracted information from the documents.
    5. If the requested information cannot be found in the DOCUMENTS or PATIENT INFORMATION, state "Not documented" or "Unable to provide information at this time."
    
    RESPONSE FORMAT:
    - Begin with a friendly greeting or acknowledgment of the user's inquiry.
    - Provide a concise answer or recommendation based on the context and patient documents.
    - Include specific values, dates, or findings from the documents where applicable.
    - Offer additional resources or suggestions if applicable.

    RESPONSE:
    """
)


def process_preprocessed_data(preprocessed_data):
    """Converts extracted table data from dict format to LangChain Document format."""
    documents = []
    
    for page, tables in preprocessed_data.items():
        page_text = ""

        # Convert table data to formatted text
        for table in tables.items():
            for row in table:
                if isinstance(row, (list, tuple)):
                    row_text = "\t".join(map(str, row))  # Join row elements with tabs
                else:
                    row_text = str(row)  # Handle cases where `row` is an integer or single value
                page_text += row_text + "\n"
            page_text += "\n"  # Add spacing between tables
        
        # Create a LangChain Document with page metadata
        doc = Document(page_content=page_text, metadata={"page": page})
        # print(doc.page_content)
        # print(doc.metadata)
        documents.append(doc)

    return documents

def process_uploaded_file(directory_path):
    """Processes a given PDF file and returns extracted documents."""
    loader = PyPDFLoader(directory_path)
    all_documents = loader.load()
    
    return all_documents

def vector_embedding(documents,flag):
    """Generates vector embeddings from documents."""
    print("Processing documents...")

    #embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

    if flag:        #for a vector db of all documents
        documents = list(chain.from_iterable(documents))

    final_documents = text_splitter.split_documents(documents)
    vectors = FAISS.from_documents(final_documents, embeddings)
    print("Documents processed successfully!")
    return vectors

def generate_summary(vectors):
    """Generates a summary of the uploaded documents."""
    document_chain = create_stuff_documents_chain(llm, summary_prompt)
    retriever = vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    
    start = time.process_time()
    response = retrieval_chain.invoke({'input': 'Summarize the document'})
    elapsed_time = time.process_time() - start
    
    print(f"Summary generated in {elapsed_time:.2f} seconds!\n")
    # print("=== DOCUMENT SUMMARY ===")
    # print(response['answer'])
    return response['answer']

def generate_history(vectors,patient_info):
    """Generates a summary of the uploaded documents."""
    document_chain = create_stuff_documents_chain(llm, history_prompt)
    retriever = vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    
    start = time.process_time()
    response = retrieval_chain.invoke({
            'input': 'Generate a comprehensive patient history summary',
            'patient_info': patient_info
        })
    elapsed_time = time.process_time() - start
    
    print(f"Summary generated in {elapsed_time:.2f} seconds!\n")
    # print("=== DOCUMENT SUMMARY ===")
    # print(response['answer'])
    return response['answer']
    
def generate_response(vectors,patient_info,query):
    document_chain = create_stuff_documents_chain(llm, chatbot_prompt)
    retriever = vectors.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)
    
    start = time.process_time()
    response = retrieval_chain.invoke({
            'input': 'Please provide the most accurate response based on the query',
            'patient_info': patient_info,
            'query':query
        })
    elapsed_time = time.process_time() - start
    
    print(f"Response generated in {elapsed_time:.2f} seconds!\n")
    # print("=== DOCUMENT SUMMARY ===")
    # print(response['answer'])
    return response['answer']


def main(history_vector_db_path, all_vector_db_path):

    doc_list = {'Vaibhav_Gatne_2022_03_10.pdf':{'date' : '10/3/2022', 'type' : 'Imaging Report'},
                'Vaibhav_Gatne_2022_03_11_2.pdf':{'date' : '11/3/2022', 'type':'x-ray Report'},
                'Vaibhav_Gatne_2022_03_12.pdf':{'date' : '12/3/2022', 'type':'MRI Report'},
                'Vaibhav_Gatne_2022_03_14_2.pdf':{'date': '14/3/2022', 'type':'ERCP report'},
                'Vaibhav_Gatne_2022_03_14.pdf':{'date':'14/3/2022','type':'Endoscopy Discharge report'},
                'Vaibhav_Gatne_2022_03_19.pdf':{'date':'19/3/2022','type':'Discharge Summary'},
                'Vaibhav_Gatne_2022_04_15.pdf':{'date':'15/4/2022','type':'ERCP report'},
                'Vaibhav_Gatne_2023_07_22.pdf':{'date':'22/7/2023','type':'Sonography Report'},
                'Vaibhav_Gatne_2022_03_11.pdf':{'date':'11/3/2022','type':'Blood test Report'},
                'Vaibhav_Gatne_2022_03_17.pdf':{'date':'17/3/2022','type':'Biochemistry Report'},
                'Vaibhav_Gatne_2022_03_20.pdf':{'date':'20/3/2022','type':'Blood test Report'},
                'Vaibhav_Gatne_2022_03_21.pdf':{'date':'21/3/2022','type':'Blood test Report'},
                'Vaibhav_Gatne_2023_07_21.pdf':{'date':'21/7/2023','type':'Blood test Report'},
                'Vaibhav_Gatne_2024_06_18.pdf':{'date':'11/3/2024','type':'Blood test Report'}
                }
    
    patient_info = """ PATIENT INFORMATION:
    - Full Name: Vaibhav Gatne
    - Date of Birth: 23/02/1970
    - Gender: Male
    - Contact Information: -
    - Current Medications: none
    - Allergies: none
    - Surgical History: undergone ERCP (Endoscopic Retrograde Cholangiopancreatography) with stent placement in September 2019.The patient underwent a stent removal procedure on April 15, 2022, which involved removing previously placed biliary and PD stents using a snare, and subsequently performing selective CBD (Common Bile Duct) cannulation over a guidewire.
    - Family Medical History: diabetes
    - Vital Signs and Physical Characteristics: -
    - Height: 168cm
    - Weight: 75kg
    - Body Mass Index (BMI): -
    - Blood Group: O+ve
    
    - Lifestyle Information:
    - Dietary Habits: Vegetarian
    - Physical Activity: 2-4km walking and yoga
    - Sleep Patterns: 6 hours
    - Stress Management: -
    - Substance Use: none
    - Social Connections: married and has a family
    - Additional Health Information:
    - Immunization History: all basic vaccinces required in India and covid vaccine
    - Reproductive History: none
    - Psychological History: none
    - Occupational and Environmental Exposures: director at a software company
    """
    
    print("Loading document...")

    history = ""
    directory_path = "VG_med_history"

    desc = os.path.join(directory_path, 'descriptive_format')
    table = os.path.join(directory_path, 'table_format')

    all_docs = []   # for the chatbot
    history = []    # for generating history; collection of all the summaries
    page = 1
   

    try:
        history_vectors = FAISS.load_local(
            folder_path = history_vector_db_path,
            embeddings = embeddings,
            allow_dangerous_deserialization=True
        )

        all_doc_vectors = FAISS.load_local(
            folder_path = all_vector_db_path,
            embeddings = embeddings,
            allow_dangerous_deserialization=True
        )
    except:
        for file in os.listdir(table):
            # processing of all the table format files
            pdf = os.path.join(table, file)
            pdf_data = processing(pdf)
            documents = process_preprocessed_data(pdf_data)  # make langchain docs out of them
            all_docs.append(documents)
            curr_vectors = vector_embedding(documents,flag=False) 
            
            doc = Document(page_content=str(doc_list[file]) + '\n' + generate_summary(curr_vectors),metadata={"page": page})
            page+=1
            history.append(doc)

        for file in os.listdir(desc):
            documents = process_uploaded_file(os.path.join(desc, file)) 
            all_docs.append(documents)

            #------------------------------uncomment this all-------------------------------------
            curr_vectors = vector_embedding(documents,flag=False)
            doc = Document(page_content=str(doc_list[file]) + '\n' + generate_summary(curr_vectors),metadata={"page": page})
            page+=1
            history.append(doc)
    
   
        history_vectors = vector_embedding(history,flag=False)
        all_doc_vectors = vector_embedding(all_docs,flag = True)

        history_vectors.save_local(folder_path = history_vector_db_path)
        all_doc_vectors.save_local(folder_path = all_vector_db_path)
    
    print("\n\n\n-----------------Final summary----------------\n\n\n")
    print(generate_history(history_vectors,patient_info))
    #------------------------------------------------------------------------------------------

    print("Chat with your documents!")
    chat  = True
    while(chat):
        question = input("Your Question : ")
        print(generate_response(all_doc_vectors,patient_info,question))

        chat = False if input("do you have anymore questions? (y/n)") == 'n' else True

    
if __name__ == "__main__":
   # main(os.path.join("vector_dbs","history_vectors"),os.path.join("vector_dbs","all_vectors") )
   pass

































# def ask_question(vectors, question):
#     """Answers a user question based on the uploaded documents."""
#     document_chain = create_stuff_documents_chain(llm, qa_prompt)
#     retriever = vectors.as_retriever()
#     retrieval_chain = create_retrieval_chain(retriever, document_chain)
    
#     start = time.process_time()
#     response = retrieval_chain.invoke({'input': question})
#     elapsed_time = time.process_time() - start
    
#     print(f"Answer found in {elapsed_time:.2f} seconds!\n")
#     print("=== ANSWER ===")
#     print(response['answer'])




# parser = argparse.ArgumentParser(description="MEDPASS")
    # parser.add_argument("--file", type=str, help="Path to the PDF document")
    # parser.add_argument("--summary", action="store_true", help="Generate a summary of the document")
    # parser.add_argument("--question", type=str, help="Ask a question about the document")
    # args = parser.parse_args()
    
    # if not args.file:
    #     print("Error: Please provide a PDF file using --file")
    #     return
    
    # if not os.path.exists(args.file):
    #     print("Error: File not found!")
    #     return


#   qa_prompt = ChatPromptTemplate.from_template(
#     """
#     Answer the questions based on the provided context only.
#     Please provide the most accurate response based on the question
#     <context>
#     {context}
#     </context>
#     Questions: {input}
#     """
# )
