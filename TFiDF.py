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

def obtain_top_trigrams(string_list, n=20):
    trigram_measures = TrigramAssocMeasures()
    collocations_founder = TrigramCollocationFinder.from_words(string_list)
    return collocations_founder.nbest(trigram_measures.pmi, n)

nlp = spacy.load("en_core_web_sm")
tokenizer = English().tokenizer

STOP_WORDS = nlp.Defaults.stop_words
GET_DATA = True

PRODUCTS_FILE = f'./product_data.json'
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
# print(description_list)
# description_list_cleaned = []

cv = CountVectorizer(max_df=0.85, max_features= int(len(description_list) * 0.01))
word_count_vector = cv.fit_transform(description_list)
tfidf_transformer = TfidfTransformer(smooth_idf=True, use_idf=True)
tfidf_transformer.fit(word_count_vector)
# do this once, this is a mapping of index
feature_names = cv.get_feature_names_out()
# get the document that we want to extract keywords from
doc = description_list[4]

# generate tf-idf for the given document
tf_idf_vector = tfidf_transformer.transform(cv.transform([doc]))
print([feature_names, cv.inverse_transform(tf_idf_vector), doc])
print(tf_idf_vector.T)
print(tfidf_transformer)


# tfidf_vectorizer = TfidfVectorizer(use_idf=True, stop_words='english')
# tfidf = tfidf_vectorizer.fit_transform(description_list)
# print(tfidf.T)
# print(tfidf_vectorizer.inverse_transform(tfidf.T))

# for index, description in enumerate(description_list):
#     print('Initial text', description)
#     tokens = [token.text for token in tokenizer(description)]
#
#     new_tokens = []
#     for token in tokens:
#         token = token.lower()
#         token = num2words(token) if token.isdigit() else token
#         token = re.sub(r'[^\w\s]', '', token)
#         if token != '' and token not in STOP_WORDS:
#             new_tokens.append(token)
#
#     # description = " ".join([num2words(word) if word.isdigit() else word for word in tokens])
#     # print('Numbers were transformed', description)
#     # remove the punctuation marks
#     # description = re.sub(r'[^\w\s]', ' ', description)
#     # remove the multiple spaces
#     # description = re.sub(r'\s+', ' ', description)
#     # description = description.lower()
#     # description = " ".join([word for word in description.split(" ") if word not in STOP_WORDS])
#     # print('The stop words were illuminated', description)
#     description_list_cleaned.append(" ".join(new_tokens))
#     # print('Cleaned up', description)
#     # if index == 10:
#     #     break
#
# results = obtain_top_trigrams(description_list)
# print(results)

# description_list=lmt.lemmatize(description_list)
# tfIdfVectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words={'english'})
# tfIdf = tfIdfVectorizer.fit_transform(description_list)
# pprint.pprint(tfIdfVectorizer.vocabulary_)

# df = pd.DataFrame([tfIdfVectorizer.vocabulary_[key] for key in tfIdfVectorizer.vocabulary_],
# index=tfIdfVectorizer.vocabulary_.keys(), columns=["TF-IDF"])
# df = df.sort_values('TF-IDF', ascending=False)

# f = open(f"test-{uuid.uuid4()}.txt", "w")
# f.write(df.head(len(description_list)).to_string())
# print(description_list[0])
