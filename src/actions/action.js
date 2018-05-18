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
		onFieldAdd: payload => {
			dispatch({ type: "REQUEST_FIELD_ADD", payload});
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

export const datalistDispatchToProps = dispatch => {
	return {
		requestDatalist : (params) => {
			if(params.page <= 0){
				params.page = 1;
			}
			dispatch(
				{
					type:"REQUEST_DATALIST",
					...params
				}
			)
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


