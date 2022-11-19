import json

from sklearn.feature_extraction.text import CountVectorizer

from settings import *
import re

tags_referencing_products = []
with open(PRODUCTS_FILE, 'r') as product_file:
    products = json.load(product_file)
    # obtaining id from link

    # pre process the tags to obtain just the final words
    tags_referencing_products = [{product['product_url']: [tag for tag in product['tags'] if len(tag) > 1 and re.match(r'[a-zA-Z]+', tag)]} for product in products]


print(tags_referencing_products)


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