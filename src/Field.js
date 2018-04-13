class Info extends React.Component {
  render() {
    return (
<li id="field_tr" className="field_row_tr field_tr_start">
	<input type="checkbox" name="IN_activeCustomes" id="field_add"  checked="checked" />
    <label for="field_add" className="chk" title="세그먼트 활용"/><span class="blind">선택</span>    
    <div className="tooltip_text"> 세그먼트 활용</div>
		<input className="a_field_name" type="text" name="IN_fieldName" style="width:17%" value="" /*{schema_define.add_field.name}"*/ required="required" pattern="[a-zA-Z_]+[a-zA-Z0-9_]+" data-validation-callback-callback="validate_field_name"/>
        	<div className="select" style="width:13.5%">
            <div className=" ui fluid selection dropdown field_type_select_box_div" style="background: #fff url(https://image-glb.qpyou.cn/markup/img/hiveconsole/bg_select.png) 100% 50% no-repeat;">
							<input type="hidden" name="IN_fieldType" data-value="#{schema_define.add_type.name}" class="a_field_type"/> 
							<div className="default text" /*{schema_define.add_type.name}*/>Select Game</div>
							<div className="menu" id="gameselect">
								<div className="item selected" data-value="STRING" >STRING</div>
								<div className="item" data-value="INTEGER">INTEGER</div>
								<div className="item" data-value="FLOAT">FLOAT</div>
							</div>
						</div>	                           
					</div>
		<input type="hidden" name="IN_fieldOpt" value="NULLABLE"/>                                    
			
		<input type="text"  name="IN_description" id="" className="a_field_desc form-control" /*{schema_define.add_desc.name}*/  style="width:36%" required="required"/>
        <input type="text"  name="IN_sampleValue" id="" className="a_field_sample form-control" /*{schema_define.add_sample.name}*/ style="width:22%" required="required"/>
                        
        <a href="#this" onclick="addChild(this)" className="ibtn_add"><i></i><span className="blind">추가</span></a>
        <a href="#this" onclick="delChild(this)" className="ibtn_remove" style="display:none"><i></i><span className="blind">삭제</span></a>
</li>
    );
  }
}
