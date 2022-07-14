
	document.querySelectorAll('#sort_table th').forEach(elm => {
		elm.onclick = function () {
			let table = this.parentNode.parentNode.parentNode;
			let sortArray = new Array; //クリックした列のデータを全て格納する配列
			for (let r = 1; r < table.rows.length; r++) {
				//行番号と値を配列に格納
				let column = new Object;
				column.row = table.rows[r];
				column.value = table.rows[r].cells[column_no].textContent;
				sortArray.push(column);
				}
					sortArray.sort(compareNumber);
			} 
			//ソート後のTRオブジェクトを順番にtbodyへ追加（移動）
			let tbody = this.parentNode.parentNode;
			for (let i = 0; i < sortArray.length; i++) {
				tbody.appendChild(sortArray[i].row);
			}
	});
//数値ソート（昇順）
function compareNumber(a, b)
{
	return a.value - b.value;
}
