import requests
from bs4 import BeautifulSoup

def get_array_of_definitions(list_of_html):
    """
    Returns an array of definitions. Accept a list of html and the return
    array contains the innerHTML of all html 
    """
    text_array = []
    for html in list_of_html:
        text_array.append(html.text)
    return text_array

headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    }

url = 'https://dictionary.cambridge.org/dictionary/english/stringent'

page = requests.get(url, headers=headers)
soup = BeautifulSoup(page.content, 'html.parser')
vocab_meaning = soup.find_all(class_="def ddef_d db")

array_of_definitions = get_array_of_definitions(vocab_meaning)

print(array_of_definitions)


