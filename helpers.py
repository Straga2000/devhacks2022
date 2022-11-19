import json
import re
from num2words import num2words
from tqdm import tqdm
from unidecode import unidecode
import os
from uuid import uuid4

import spacy
from nltk import SnowballStemmer
from datetime import datetime

stemmer = SnowballStemmer(language='english')
nlp = spacy.load("en_core_web_sm")
STOP_WORDS = nlp.Defaults.stop_words

def loader_with_message(iterable, message):
    progress = tqdm(iterable)
    progress.set_description(message)
    return progress


def read_json_lines(file_path):
    with open(file_path, 'r') as json_file:
        return [json.loads(line) for line in loader_with_message(json_file.readlines(), 'Reading news input')]


def read_json(file_path):
    with open(file_path, 'r') as json_file:
        return json.load(json_file)


def number_to_words(string_element):
    result = ' '.join([num2words(word) if word.isdigit() else word for word in string_element.split(' ')])
    return result


def clean_punctuation(string_element):
    return re.sub(r'[^\w\s] ', ' ', string_element)


def clean_spaces(string_element):
    result = re.sub(r'\s+', ' ', string_element)
    return result


def stemming(string_element):
    return [stemmer.stem(word.text) for word in nlp(string_element)]


def lemmatisation(string_element):
    result = [word.lemma_ for word in nlp(string_element)]
    # print(string_element, result)
    return result


def standard_lower(string_element):
    return unidecode(string_element.lower())


def eliminate_stop_words(string_element):
    return [word for word in string_element if word not in STOP_WORDS]


def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.mkdir(folder_path)
        return True

    return False


def obtain_test_name():
    return f'{uuid4()}'


def write_json(file_name, folder_path, input_data):
    file_path = f'{folder_path}{file_name}.json'
    with open(file_path, 'w') as file_object:
        json.dump(input_data, file_object)
    return file_path
