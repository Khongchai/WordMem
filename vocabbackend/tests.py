from django.test import TestCase
from .models import Vocab, User

class VocabTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create(username="Khong", password="khong")
        user2 = User.objects.create(username="Admin", password="admin")
        
        Vocab.objects.create(word="word1", owner=user1, meaning="meaning1")
        Vocab.objects.create(word="word2", owner=user2, meaning="meaning2")
        Vocab.objects.create(word="word3", owner=user1, meaning="meaning3")
        Vocab.objects.create(word="word4", owner=user2, meaning="meaning4")


    def test_vocab_synonyms(self): 
        """
        check synonyms of two words
        """
        word1 = Vocab.objects.get(word="word1")
        word2 = Vocab.objects.get(word="word2")
        
        word1.synonyms.add(word2)

        self.assertEqual(word1.synonyms.count(), 1)
        self.assertEqual(word2.synonyms.count(), 1)
    
    def check_total_vocab_on_server(self):
        """
        check total vocab on server
        currently, there are 4 vocab
        """
        self.assertEqual(Vocab.objects.count(), 4)

    def check_total_vocab_of_a_user(self):
        """
        check total vocab of a user
        """
        pass
    def check_vocab_owner(self):
        """
        check owner of a vocab
        """
        pass

    def test_get_vocab_list(self):
        """
        test fetching for a list of vocab
        the return value should be a list of vocab 
        for that particular user
        """
        pass