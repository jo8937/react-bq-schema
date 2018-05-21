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
from flask import redirect, url_for, send_from_directory, abort
from flask.templating import render_template
import logging
from datetime import datetime, timedelta

app = Flask(__name__, template_folder="build",static_folder='build/static',)

reload(sys)  
sys.setdefaultencoding('utf8')

weblog = logging.getLogger("dummy")
streaminghandler = logging.StreamHandler(sys.stdout)
streaminghandler.setFormatter(logging.Formatter("# %(asctime)-15s # [%(levelname)s] %(message)s")) 
weblog.addHandler(streaminghandler)
weblog.setLevel(logging.DEBUG)

@app.route("/")
def hello():
    return render_template("index.html")

#############################################################
# Schema Explorer

monitor_counts = datetime.now()

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
    "name" : "longName",
    "type" : "STRING",
    "description" : "Long name of application",
    "sampleValue" : "longName sample",
    "idx" : 3,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : False,
    "required" : False,
    "active" : 1,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False    
  }
  ,
  {
    "name" : "category",
    "type" : "STRING",
    "description" : "Cate",
    "sampleValue" : "logining",
    "idx" : 4,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : True,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  }
,
  {
    "name" : "guid",
    "type" : "STRING",
    "description" : "guid",
    "sampleValue" : "sadfe13r32f",
    "idx" : 5,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : True,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  }
  ,
  {
    "name" : "tag1",
    "type" : "STRING",
    "description" : "tag1",
    "sampleValue" : "ttt",
    "idx" : 6,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : False,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  }
  ,
  {
    "name" : "shortName",
    "type" : "STRING",
    "description" : "shortName",
    "sampleValue" : "sss",
    "idx" : 7,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : True,
    "required" : False,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  }
  ,
  {
    "name" : "aid",
    "type" : "FLOAT",
    "description" : "aid",
    "sampleValue" : "sss",
    "idx" : 8,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : False,
    "required" : False,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  },
  {
    "name" : "testDate",
    "type" : "DATETIME",
    "description" : "aid",
    "sampleValue" : "sss",
    "idx" : 8,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : False,
    "required" : False,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  },
  {
    "name" : "open",
    "type" : "BOOLEAN",
    "description" : "open",
    "sampleValue" : "True",
    "idx" : 8,
    "category" : "test",
    "fieldOpt" : "NULLABLE",
    "common" : False,
    "required" : False,
    "active" : 0,
    "regDate" : 1520577078000,
    "segment" : False,
    "clientHeader" : False,
    "generated" : False
  }
  ]
}

datalist = [{
    "category":"loginlog",
    "guid":"a%s" % i,
    "dateTime":(datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d %H:%M:%S'), 
    "uid":i, 
    "aid":2.1, 
    "longName":"aaaa%s"%i, 
    "shortName":"b%s"%i,
    "tag1":"tag-%s"%i,
    "testDate":(datetime.now() + timedelta(days=-i)).strftime('%Y-%m-%d %H:%M:%S'), 
    "open": False
} for i in xrange(0,123)]

   
@app.route("/app/<k>/logdef/schema/view/<cate>.json")
def view(k,cate):
    time.sleep(1)
    return jsonify(schema)

@app.route("/app/<k>/logdef/schema/detail/<cate>.json")
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

@app.route("/app/<k>/logdef/schema/write_proc.json")
def write_proc(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))
    return jsonify(success=True)

@app.route("/app/<k>/logdef/schema/field_add_proc.json", methods=['GET', 'POST'])
def field_add(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))
    time.sleep(1)
    newField = {
                    "name" : request.json.get("field_name"),
                    "type" : request.json.get("field_type"),
                    "description" : request.json.get("field_desc"),
                    "sampleValue" : request.json.get("field_sample_value"),
                    "category" : schema["schema"]["category"],
                    "fieldOpt" : "NULLABLE",
                    "common" : False,
                    "required" : False,
                    "active" : request.json.get("field_active",0),
                    "regDate" : 1520577078000,
                    "segment" : False,
                    "clientHeader" : False,
                    "generated" : False
                  }
    schema["fields"].append(newField)
   
    return jsonify(success=True, field=newField)

@app.route("/app/<k>/logdef/field/active", methods=['GET', 'POST'])
def field_active(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    for index, row in enumerate(schema["fields"]):
        if request.json["name"] == row["name"]:
            weblog.debug("...")
            schema["fields"][index]["active"] = request.json["value"]

    return jsonify(success=True)

@app.route("/app/<k>/logdef/schema/field_edit_proc", methods=['GET', 'POST'])
def field_edit_proc(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    for index, row in enumerate(schema["fields"]):
        if request.json["name"] == row["name"]:
            schema["fields"][index][request.json["col"]] = request.json["value"]

    return jsonify(success=True)

@app.route("/app/<k>/logdef/schema/schema_edit_proc", methods=['GET', 'POST'])
def schema_edit_proc(k):
    weblog.debug(json.dumps(request.json, indent=4, ensure_ascii=False))

    if request.json["name"] in schema["schema"]:
        schema["schema"][request.json["name"]] = request.json["value"]

    return jsonify(success=True)


#############################################################
# Utils

@app.route("/app/<k>/logdef/schema/trace/<cate>")
def trace(k,cate):
    j = json.dumps(schema, indent=4, ensure_ascii=False)
    weblog.debug(j)
    return j

#############################################################
# Utils : Source Generating .. etc 

@app.route("/app/<k>/logdef/schema/generate_source.json", methods=['GET', 'POST'])
def generate_source(k):
    #idx: 142
    #lang: OBJC
    #return jsonify(url="/login", message="need login"), 401
    #return abort(500);
    #return redirect("http://google.com");
    try:

        gen_schema = {
            "schema" : schema["schema"],
            "fields" : [{"name":row["name"],"type":row["type"],"description":row["description"],"sampleValue":row["sampleValue"]} for row in schema["fields"] if row["active"] > 0]
        }

        return jsonify(lang=request.values["lang"], source="""hello... {} .... 
{}
        """.format(request.values["lang"], json.dumps(gen_schema, indent=4, ensure_ascii=False))) ;
    except:
        weblog.error(json.dumps(request.values, indent=4, ensure_ascii=False),exc_info=True)
        return jsonify(lang=request.values["lang"], source="error")

#############################################################
# Data Explorer 

@app.route("/app/<k>/logdef/data/tabledata.json", methods=['GET', 'POST'])
def tabledata(k):
    weblog.debug("show table data")
    req = request.json or {}
    page = req.get("page",1)
    listSize = req.get("listSize",10)
    global datalist
    res_datalist = datalist
    if req.get("K") and req.get("V") and req.get("M"):
        if req.get("M") == "EQUAL":
            res_datalist = [row for row in datalist if req["V"] == str(row.get(req["K"]))]
        else:
            res_datalist = [row for row in datalist if req["V"] in str(row.get(req["K"]))]

    return jsonify({
	"dataList": res_datalist[((page-1)*listSize):(page*listSize)]
	,
	"param": {
		"token": "",
		"page": page,
		"listSize": 10,
		"pageSize": 10,
		"dataset": "test",
		"tableName": "loginlog",
		"sortColumn": "",
		"sortMethod": "ASC",
		"previewMode": "SELECT_RECENT",
		"search": [],
		"cols": [],
		"k": req.get("K"),
		"m": req.get("M"),
		"v": req.get("V"),
		"columnNameToStringForLikeSearch": False
	},
	"paging": {
		"token": "",
		"page": page,
		"listSize": 10,
		"pageSize": 10,
		"totalData": len(res_datalist),
		"totalPage": 1 + len(res_datalist) / 10,
		"startPage": 1,
		"endPage": 10 if len(res_datalist) >= 100 else 1 + len(res_datalist) / 10,
		"prevToken": "",
		"nextToken": "",
		"prevPage": 0,
		"hasPrev": False,
		"hasFirst": False,
		"hasLast": True,
		"hasNext": True,
		"nextPage": 11,
		"sort": None,
		"pageNumber": 1,
		"offset": 0
	},
	"colList": [
        "category",
        "guid",
        "dateTime", 
        "uid", 
        "aid", 
        "longName", 
        "shortName",
        "tag1"
	]
})

@app.route("/app/<k>/logdef/etl/send", methods=['GET', 'POST'])
def tabledata_send_sample(k):
    global monitor_counts
    monitor_counts = datetime.now()
    return jsonify(dataList=[{"title":"a"}])

@app.route("/app/<k>/logdef/etl/monitor", methods=['GET', 'POST'])
def tabledata_send_monitor(k):
    global monitor_counts
    weblog.debug("etl monitor at...%s",monitor_counts)
    diff = datetime.now() - monitor_counts
    if diff.seconds > 7:
        global datalist
        i = diff.seconds
        d = {
            "category":"loginlog",
            "guid":"avdvsavdsavsdvasdv%s" % i,
            "dateTime":(datetime.now()).strftime('%Y-%m-%d %H:%M:%S'), 
            "uid":i, 
            "aid":2.1, 
            "longName":"asdfasdfasdfaaaa%s"%i, 
            "shortName":"b%s"%i,
            "tag1":"tag-%s"%i,
            "testDate":(datetime.now()).strftime('%Y-%m-%d %H:%M:%S'), 
            "open": False
        }
        datalist.append(d)
        return jsonify(status=dict(was=True, fluentd=True, bigquery=True), data=d)
    elif diff.seconds > 3:
        return jsonify(status=dict(was=True, fluentd=True, bigquery=False))
    else:
        return jsonify(status=dict(was=True, fluentd=False, bigquery=False))

@app.route("/api/intra/check_login_session", methods=['GET', 'POST'])
def check_login_session():
    return jsonify(success=True,message="login session not found")


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == "__main__":
    app.run("0.0.0.0", 3001, debug=True, threaded=True)
