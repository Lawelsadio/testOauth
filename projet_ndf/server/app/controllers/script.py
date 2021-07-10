#!/usr/bin/python
import io
import os
import sys, json
import base64
from typing import IO
from PIL import Image
import cv2
import numpy as np
import PIL.Image

import pytesseract
from pytesseract import image_to_string

import spacy
import en_core_web_sm 
#import en_core_web_trf
import en_core_web_lg
import en_core_web_md 
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords
from unidecode import unidecode
import string

nlp_sm = en_core_web_sm.load()
nlp_lg = en_core_web_lg.load() 
nlp_md = en_core_web_md.load()

def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return lines
def stringToRGB(base64_string):
    imgdata = base64.b64decode(str(base64_string))
    image = Image.open(io.BytesIO(imgdata))
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
def pre_process(corpus):
    # convert input corpus to lower case.
    corpus = corpus.lower()
    # collecting a list of stop words from nltk and punctuation form
    # string class and create single array.
    stopset = stopwords.words('french') + list(string.punctuation)
    # remove stop words and punctuations from string.
    # word_tokenize is used to tokenize the input corpus in word tokens.
    corpus = " ".join([i for i in word_tokenize(corpus) if i not in stopset])
    # remove non-ascii characters
    corpus = unidecode(corpus)
    return corpus

def main():
    lines = read_in()
    #print(lines)
    window_name = 'Image'
    image = stringToRGB(lines)
    imS = cv2.resize(image, (960, 700))
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    image_to_text = pytesseract.image_to_string(image, lang='eng')
    name = sys.argv[1]
    name = name[7:-4]
    f = open('%s.txt' % name, "w")
    f.write(image_to_text)
    f.close()

    f = open('%s.txt' % name, "r")
    lines = f.readlines()
    f.close()
    new_lines = []

    for line in lines :
    #print("#",line)
       new_line = pre_process(line)
       new_lines.append(new_line)

    total_nlp = nlp_md("total")
    my_token = ''
    top_score = 0
    #print("\n",total_nlp)
    for the_line in new_lines :
        the_line_nlp = nlp_md(the_line)
        #print("\n",total_nlp.similarity(the_line_nlp))
        s = total_nlp.similarity(the_line_nlp)
        if (s > top_score) :
             top_score = s 
             my_token = the_line
    
    tokens = word_tokenize(my_token)
    number_nlp = nlp_sm("1234.56")
    number = 0
    montant = '' 

    for token in tokens :
        token_nlp = nlp_sm(token)
        t = number_nlp.similarity(token_nlp)
        #print("\n", token)
        #print("\n",t)
        if (t > number) :
           number = t 
           montant = token
    
    print(montant)
        
        
     #cv2.imshow(window_name, imS)
     #cv2.waitKey(0)  
     #cv2.destroyAllWindows()
    #print(sys.argv[1])
    

if __name__ == "__main__":
    main()