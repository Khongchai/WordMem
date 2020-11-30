from .models import Vocab
import requests
from bs4 import BeautifulSoup

def get_syn_id(synonym_list_strings):
    synonym_list_id = []
    does_not_exist = -1
    for synonym in synonym_list_strings:
        try:
            synonym_id = Vocab.objects.get(word=synonym).id
        except Vocab.DoesNotExist:
            synonym_id = does_not_exist 

        synonym_list_id.append(synonym_id)
    return synonym_list_id


def get_list_of_definitions(word):
    """
    Returns an array of definitions. Accept a word and the return
    array contains the innerHTML content of all definitions
    """

    headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    }

    url = 'https://dictionary.cambridge.org/dictionary/english/{word}'

    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    list_of_html = soup.find_all(class_="def ddef_d db")

    text_array = []
    for html in list_of_html:
        text_array.append(html.text)
    return text_array
