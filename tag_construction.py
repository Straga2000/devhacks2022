import pprint
import uuid
import requests
import spacy
from num2words import num2words
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer, TfidfTransformer
from spacy.lang.en import English
import os
import re
import json
from nltk.collocations import TrigramCollocationFinder, TrigramAssocMeasures
import numpy as np
from settings import *
from helpers import *
from sklearn import preprocessing, metrics


nlp = spacy.load("en_core_web_sm")
tokenizer = English().tokenizer

STOP_WORDS = nlp.Defaults.stop_words

product_data = []
if not os.path.exists(PRODUCTS_FILE):
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

    with open(PRODUCTS_FILE, 'w+') as save_file:
        json.dump(product_data, save_file)
else:
    with open(PRODUCTS_FILE, 'r') as saved_file:
        product_data = json.load(saved_file)

print(product_data[0])
description_list = [product['description'] for product in product_data]


def preprocessor(input_elem):
    input_elem = standard_lower(input_elem)
    input_elem = number_to_words(input_elem)
    input_elem = clean_punctuation(input_elem)
    input_elem = clean_spaces(input_elem)
    return input_elem

def tokenizer(input_elem):
    input_elem = lemmatisation(input_elem)
    input_elem = eliminate_stop_words(input_elem)
    return input_elem

# make tags from unprocessed description elements
for index, (description, product) in enumerate(zip(description_list, product_data)):
    description = clean_punctuation(description)
    description = description.split(" ")

    description = [re.sub(r'^[^\w\s]$', '',elem.lemma_) for word in description for elem in nlp(word)]
    description = [elem for elem in description if elem != '' and elem not in STOP_WORDS]

    product_data[index]['tags'] = description

    # description = eliminate_stop_words(description)
    # description = [lemmatisation(word) for word in description.split(" ")]
    print(description)
    # we need to compare different types of groups created from words found in multiple descriptions


    # description = " ".join(lemmatisation(description))
    # description = clean_punctuation(description).split(" ")
    # description = eliminate_stop_words(description)

    # print(description)

with open(PRODUCTS_FILE_WITH_ROUGH_TAGS, 'w+') as product_new:
    json.dump(product_data, product_new)


#
# vectorizer = TfidfVectorizer(preprocessor=preprocessor,
#                              tokenizer=tokenizer,
#                              token_pattern=None,
#                              max_features=200,
#                              ngram_range=(1, 2))
# scaler = preprocessing.StandardScaler()
#
# print('Start fitting vectorizer')
# vectorizer.fit(description_list)
# print('Finish fitting vectorizer')
# vectorizer_keys = list(vectorizer.vocabulary_.keys())
# print(vectorizer_keys)
# features = vectorizer.transform(description_list).toarray()
# scaler.fit(features)
# print('Finish scaler fitting')
# features = scaler.transform(features)
# print('Finish scaler transform')
# print(features)