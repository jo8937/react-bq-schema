import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import moment from 'moment';

const a = "aaa";

const SourceJava = () => (
  <pre>
{`

// HIVE SDK v4 Analytics Game Log API - Java Source (툴에서 자동 생성되는 부분)
//
// @file GameLogAPI.java
// @date ${moment()}

package com.hive.sample; 

import java.util.Date; 


public class GameLogAPI { 

<#list voList as vo>
    /** 
     * 
     *
    <#list vo.pureFieldList as field>
     * @param 
    </#list>
     */
	public static void log_${a}( 
`}
{[1,2,3].map( (i) => `${a} ${i}`).join(`,
`)}
{`
        )
    {
        
        java.util.Map<String, Object> logData = new java.util.HashMap<String, Object>();
        logData.put("category", "${a}");
`}
{[1,2,3].map( (i) => `logData.put("category", "${i}");
`)}
{`
		com.hive.Analytics.sendAnalyticsLog(logData);
	}
</#list>
`
}
  </pre>
);

const SourceGenerateTest = () => (
      <div className="App">
        <SourceJava/>
      </div>
    );
    
export default SourceGenerateTest;