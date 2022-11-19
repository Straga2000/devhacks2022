import requests
import spacy
from num2words import num2words
from spacy.lang.en import English
import re
nlp = spacy.load("en_core_web_sm")

# Create a Tokenizer with the default settings for English
# including punctuation rules and exceptions
tokenizer = English().tokenizer


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
    print('Initial', description)
    tokens = [token.text for token in tokenizer(description)]
    description = " ".join([num2words(word) if word.isdigit() else word for word in tokens])

    # remove the punctuation marks
    description = re.sub(r'[^\w\s]', ' ', description)
    # remove the multiple spaces
    description = re.sub(r'\s+', ' ', description)
    description_list_cleaned.append(description.lower())
    print('Cleaned up', description)


# print(description_list[0])
