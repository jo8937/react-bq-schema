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
from datetime import datetime, timedelta

app = Flask(__name__)

reload(sys)  
sys.setdefaultencoding('utf8')

weblog = logging.getLogger("dummy")
streaminghandler = logging.StreamHandler(sys.stdout)
streaminghandler.setFormatter(logging.Formatter("# %(asctime)-15s # [%(levelname)s] %(message)s")) 
weblog.addHandler(streaminghandler)
weblog.setLevel(logging.DEBUG)

@app.route("/")
def hello():
    return "dummy..."

#############################################################
# Schema Explorer

schema = {
  "schema" : {
    "category" : "loginlog",
    "description" : "테스트",
    "gameGroup" : "com.test",
    "parentCategory" : "",
    "authorId" : "george",
    "authorName" : "georgeName",
    "regDate" : 1504075868000
  },
  "fields" : [ {
    "name" : "uid",
    "type" : "INTEGER",
    "description" : "User ID",
    "sampleValue" : "1",
    "idx" : 1,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : False,
    "active" : 1,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False
    ,"generated" : False
  },
  {
    "name" : "dateTime",
    "type" : "TIMESTAMP",
    "description" : "datetime",
    "sampleValue" : "2018-04-19 11:22:33",
    "idx" : 2,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : True,
    "active" : 2,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False
    ,"generated" : True
  },
  {
    "name" : "longname",
    "type" : "STRING",
    "description" : "Long name of application",
    "sampleValue" : "longname sample",
    "idx" : 3,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : False,
    "required" : False,
    "active" : 1,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False
    ,"generated" : False    
  }]
}

datalist = [{
    "category":"loginlog",
    "guid":"a%s" % i,
    "dateTime":(datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d %H:%M:%S'), 
    "uid":i, 
    "aid":2, 
    "longName":"aaaa%s"%i, 
    "shortName":"b%s"%i,
    "tag1":"tag-%s"%i
} for i in xrange(0,123)]

@app.route("/app/<k>/define/schema/view/<cate>.json")
def view(k,cate):
    time.sleep(1)
    return jsonify(schema)

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
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))
    return jsonify(success=True)

@app.route("/app/<k>/define/schema/field_add_proc.json")
def field_add(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))
    return jsonify(success=True)

@app.route("/app/<k>/define/field/active", methods=['GET', 'POST'])
def field_active(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    for index, row in enumerate(schema["fields"]):
        if request.json["name"] == row["name"]:
            weblog.debug("...")
            schema["fields"][index]["active"] = request.json["value"]

    return jsonify(success=True)

@app.route("/app/<k>/define/schema/field_edit_proc", methods=['GET', 'POST'])
def field_edit_proc(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    for index, row in enumerate(schema["fields"]):
        if request.json["name"] == row["name"]:
            schema["fields"][index][request.json["col"]] = request.json["value"]

    return jsonify(success=True)

@app.route("/app/<k>/define/schema/schema_edit_proc", methods=['GET', 'POST'])
def schema_edit_proc(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    if request.json["name"] in schema["schema"]:
        schema["schema"][request.json["name"]] = request.json["value"]

    return jsonify(success=True)


#############################################################
# Utils

@app.route("/app/<k>/define/trace/<cate>")
def trace(k,cate):
    j = json.dumps(schema, indent=4, ensure_ascii=False)
    weblog.debug(j)
    return j

#############################################################
# Utils : Source Generating .. etc 

@app.route("/app/<k>/define/schema/generate_source.json", methods=['GET', 'POST'])
def generate_source(k):
    #idx: 142
    #lang: OBJC
    weblog.debug(json.dumps(request.form, indent=4, ensure_ascii=False))
    return jsonify(source="hello...")

#############################################################
# Data Explorer 

@app.route("/app/<k>/data/tabledata/<dataset>/<tablename>.json")
def tabledata(k,dataset,tablename):
    weblog.debug("show table data")
    return jsonify(dataList=[{"title":"a"}])

@app.route("/app/<k>/data/<category>/send")
def tabledata_send_sample(k,dataset,tablename):
    return jsonify(dataList=[{"title":"a"}])

@app.route("/app/<k>/data/<category>/monitor")
def tabledata_send_monitor(k,dataset,tablename):
    weblog.debug("etl monitor at...")
    return jsonify(dataList=[{"title":"a"}])

if __name__ == "__main__":
    app.run("0.0.0.0", 3001, debug=True)
