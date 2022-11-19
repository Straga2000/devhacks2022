import json
from Levenshtein import distance as lev

with open('product_data.json', 'r') as f:
    product_data = json.load(f)

description_category = []
for product in product_data:
   description_category.append(product['tags'])

for i in description_category:
    for j in description_category:
        if i != j:
           print(lev(i, j),i,j)