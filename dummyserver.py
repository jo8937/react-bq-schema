# -*- coding: utf-8 -*-
#!/usr/local/bin/python2.7

import traceback
import httplib
import json
import os
import sys
import time
import urllib

from flask import Flask
from flask import jsonify
from flask import request
from flask import redirect, url_for
from datetime import timedelta
from flask.templating import render_template
import ujson
import logging

app = Flask(__name__)

reload(sys)  
sys.setdefaultencoding('utf8')

@app.route("/")
def hello():
    return "dummy..."

#############################################################
# Schema Explorer

@app.route("/app/<k>/define/schema/view/<cate>.json")
def view(k,cate):
    return jsonify({
  "schema" : {
    "category" : "test",
    "description" : "테스트",
    "gameGroup" : "test",
    "parentCategory" : ""
  },
  "fields" : [ {
    "name" : "uid",
    "type" : "INTEGER",
    "description" : "User ID",
    "sampleValue" : "1",
    "active" : 1,
  },
  {
    "name" : "longname",
    "type" : "STRING",
    "description" : "Long name of application",
    "sampleValue" : "longname sample",
    "active" : 1,
  }]
})

@app.route("/app/<k>/define/schema/detail/<cate>.json")
def viewdetail(k,cate):
    return jsonify({
    "category" : "test",
    "description" : "테스트",
    "gameGroup" : "test",
    "logType" : 0,
    "parentCategory" : "",
    "bigquery_dataset" : "",
    "aaa" : "",
    })

#############################################################
# Schema Controller

@app.route("/app/<k>/define/schema/write_proc.json")
def write_proc(k):
    return jsonify(success=True)

@app.route("/app/<k>/define/schema/field_add_proc.json")
def field_add(k):
    return jsonify(success=True)

@app.route("/app/<k>/define/field/active")
def field_active(k):
    return jsonify(success=True)

@app.route("/app/<k>/define/schema/field_edit_proc")
def field_edit_proc(k):
    return jsonify(success=True)

@app.route("/app/<k>/define/schema/schema_edit_proc")
def schema_edit_proc(k):
    return jsonify(success=True)

#############################################################
# Utils

@app.route("/app/<k>/define/source/generate_source")
def generate_source(k,cate):
    return "hello..."

#############################################################
# Data Explorer 

@app.route("/app/<k>/define/etl/<dataset>/<tablename>.json")
def tabledata_send_sample(k,dataset,tablename):
    return jsonify(dataList=[{"title":"a"}])

@app.route("/app/<k>/tabledata/<dataset>/<tablename>.json")
def tabledata(k,dataset,tablename):
    return jsonify(dataList=[{"title":"a"}])


if __name__ == "__main__":
    app.run("0.0.0.0", 3001, debug=True)
