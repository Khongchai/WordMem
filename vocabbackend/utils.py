from .models import Vocab
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
