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


def get_array_of_definitions(list_of_html):
    """
    Returns an array of definitions. Accept a list of html and the return
    array contains the innerHTML of all html 
    """
    text_array = []
    for html in list_of_html:
        text_array.append(html.text)
    return text_array
