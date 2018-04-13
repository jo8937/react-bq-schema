class Info extends React.Component {
  render() {
	var datalist = [{"title":"a","desc":"b"},{"title":"a2","desc":"b2"},{"title":"a3","desc":"b3"}]
    return (
		<dl className="sgm_article js_toggles" data-toggles-btn=".ibtn_toggle" data-toggles-target=">dd">
		<dt>
	    	<span className="tit">기본정보</span>
	        <button type="button" className="ibtn_toggle on"><i></i><span className="blind">보기/감추기</span></button>
	        
		</dt>
		<dd className="toggle_body on">
        	<table>
				<tbody>
					
				{
					datalist.map((item)=> (
					<tr>
	                	<th scope="row">{item.title}</th>
						<td>{item.desc}</td>
					</tr>
					))
				}
									
				</tbody>
			</table>
		</dd>
		</dl>
    );
  }
}