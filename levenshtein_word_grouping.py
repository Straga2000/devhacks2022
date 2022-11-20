import json
import pprint

from Levenshtein import distance as lev

from sklearn.feature_extraction.text import CountVectorizer

from settings import *
import re

products = []
tags_referencing_products = []
with open(PRODUCTS_FILE, 'r') as product_file:
    products = json.load(product_file)
    # obtaining id from link

    # pre process the tags to obtain just the final words
    tags_referencing_products = [set(product['tags']) for product in products]

prompt_data = input('Enter prompt')
prompt_data = set(prompt_data.split(" "))

tags_referencing_products_indexed = [(list(tags), index) for index, tags in enumerate(tags_referencing_products) if prompt_data.intersection(tags)]

minimal_distances = []
for i, idx_i in tags_referencing_products_indexed:
    for j, idx_j in tags_referencing_products_indexed:
        if i != j:
            minimal_distances.append((lev(i, j), idx_i, idx_j))
            # print('Here is the internal stuff', i, j)

minimal_distances = sorted(minimal_distances, key=lambda x: x[0])[:20]

for lev_idx, i, j in minimal_distances:
    print(lev_idx, products[i]['tags'], products[j]['tags'])
    print(lev_idx, tags_referencing_products[i], tags_referencing_products[j])

# make a TFIDF transformer for the given elements
# cv = CountVectorizer(max_df=0.85, max_features=len(tags_referencing_products))
# word_count_vector = cv.fit_transform([])
# tfidf_transformer = TfidfTransformer(smooth_idf=True, use_idf=True)
# tfidf_transformer.fit(word_count_vector)
# # do this once, this is a mapping of index
# feature_names = cv.get_feature_names_out()
# # get the document that we want to extract keywords from
# doc = description_list[4]
#
# # generate tf-idf for the given document
# tf_idf_vector = tfidf_transformer.transform(cv.transform([doc]))
# print([feature_names, cv.inverse_transform(tf_idf_vector), doc])
# print(tf_idf_vector.T)
# print(tfidf_transformer)

# def word_levenshtein(list_dicts):
#     for