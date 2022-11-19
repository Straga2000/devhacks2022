import pprint
import uuid
import nltk

nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer

import pandas as pd
import requests
import spacy
from num2words import num2words
from sklearn.feature_extraction.text import TfidfVectorizer
from spacy.lang.en import English
import re

nlp = spacy.load("en_core_web_sm")
lmt = WordNetLemmatizer()

# Create a Tokenizer with the default settings for English
# including punctuation rules and exceptions
tokenizer = English().tokenizer

STOP_WORDS = nlp.Defaults.stop_words

product_data = []
try:
    product_data = requests.get(
        "https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json").json()
except Exception as e:
    print(f"An exception appeared at getting the data. Exception: {e}")

product_data = [{
    'product_name': product['name'],
    'price': product['price'],
    'categories': product['category'],
    'description': product['description'],
    'product_url': product['url'],
    'product_image': product['image']
} for product in product_data]

print(product_data[0])
description_list = [product['description'] for product in product_data]
# print(description_list)
description_list_cleaned = []

for index, description in enumerate(description_list):
    print('Initial text', description)
    tokens = [token.text for token in tokenizer(description)]
    description = " ".join([num2words(word) if word.isdigit() else word for word in tokens])

    # remove the punctuation marks
    description = re.sub(r'[^\w\s]', ' ', description)
    # remove the multiple spaces
    description = re.sub(r'\s+', ' ', description)
    description = description.lower()
    description = " ".join([word for word in description.split(" ") if word not in STOP_WORDS])
    description_list_cleaned.append(description)
    print('Cleaned up', description)
description_list=lmt.lemmatize(description_list)
tfIdfVectorizer = TfidfVectorizer(use_idf=True, ngram_range=(1, 2), stop_words={'english'})
tfIdf = tfIdfVectorizer.fit_transform(description_list)
pprint.pprint(tfIdf)

df = pd.DataFrame([tfIdfVectorizer.vocabulary_[key] for key in tfIdfVectorizer.vocabulary_], index=tfIdfVectorizer.vocabulary_.keys(), columns=["TF-IDF"])
df = df.sort_values('TF-IDF', ascending=False)

f = open(f"test-{uuid.uuid4()}.txt", "w")
f.write(df.head(len(description_list)).to_string())

# print(description_list[0])
