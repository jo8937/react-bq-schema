import API from "./API";


export const REQ_PATTERN = new RegExp("^(.+)_PENDING$");
export const RES_PATTERN = new RegExp("^(.+)_(FULFILLED|REJECTED)$");

export const requestBigquerySchema = (category, dataset) => {

	if(!dataset)
	{
		dataset = API.INIT_PARAM.dataset;
	}
	return {
		type:"REQUEST_BIGQUERY_SCHEMA",
		payload:{
			category,
			dataset
		}
	}
};

export const requestSource = (lang, opt) => {
	return {
		type:"REQUEST_SOURCE",
		lang: lang,
		...opt
	}
}

export const requestSchemaList = (game_group) => {
	return { type: "REQUEST_SCHEMA_LIST", payload: { gameGroup: game_group } };	
}

export const requestSchema = (request_category) => {
	return { type: "REQUEST_SCHEMA", payload: { category: request_category || API.CATEGORY, test:1 } };	
}

export const showToast = (message, options) => {
	return { type: "SHOW_TOAST", message: message, options: options };	
}

export const FieldInfo_DispatchToProps = dispatch => {
	return {
	  dispatch: dispatch,
	  onFieldEdit: (...args) => {
		dispatch({
            type: "REQUEST_FIELD_EDIT",
            payload: {
                category: args[0], //category,
                col: args[1], //col,
                name: args[2], //k,
                value: args[3], //v
			}
		  });
	  },
	  onFieldActivate: (payload) => {
			dispatch({
				type: "REQUEST_FIELD_EDIT",
				payload
			});
	  },
	  
	}  
}


export const FieldAdd_D2P = dispatch => {
	return {
		onFieldAdd: (schema, formdata) => {
			dispatch({ type: "REQUEST_FIELD_ADD", payload: {
																								schema: schema,
																								fields: [{
																									...formdata
																								}]
																						}
			});
		}
	}
}

export const alertWindowDispatchToProps = dispatch => {
  return {
    closeModel: id => {
      dispatch({

			})
		}
		,
		dispatch: dispatch
  }
}

export const requestDataListAction = (params = {}) => {
	params.listSize = 10;
	if(!params.page || params.page <= 0){
		params.page = 1;
	}
	//params.payload_loading_message_id = "loading.datapreview";
	if(API.INIT_PARAM["dataset"]){
		params["dataset"] = API.INIT_PARAM["dataset"];
	}
	return {
		type:"REQUEST_DATALIST",
		...params
	}
}

export const datalistDispatchToProps = dispatch => {
	return {
		requestDatalist : (params) => {
			dispatch(requestDataListAction(params));
		},
		modifyDatalistCond : (params) => {
			dispatch(
				{
					type:"CHANGE_DATALIST_COND",
					...params
				}
			);
		}
		
	}
}



export const etlSimulDispatchToProps = dispatch => {
  return {
    onSendData: formData => {
      dispatch({
        type:"REQUEST_ETL_SEND",
        payload: formData
      })
    }
  }
}

export const dataListStateToProps = state => {
	return {
    vo: state.schemaVo,
		dataPreview: state.dataPreview
  }
}


