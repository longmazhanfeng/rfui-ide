var fs = require("fs");
var xmlreader = require('xmlreader');

// 解析block
function parseXmlblock (block) {
	// 记录解析获得的有效关键字和参数
	var line = [];
	var muta_name = block.mutation.attributes().name;
	line.push(muta_name);
	// 获取arg参数
	var value_arg = block.mutation.arg;
	// 判断arg参数是否存在，存在则继续解析
	if (value_arg != undefined) {
		for (var i = 0; i < block.mutation.arg.count(); i++) {
			var text = block.value.at(i).block.field.text();
			line.push(text);
		};
	};

	line.push("\n");
	// console.log(line);
	// 解析next节点内容，递归实现
	var value_next = block.next;
	if (value_next != undefined) {
		line = line.concat(parseXmlblock(block.next.block.at(0)));
	};

	return line;
}

fs.readFile('firstdemo.xml', function (err, data) {
	if (err) return console.error(err);
	var xmlstring = data.toString();
	// console.log(xmlstring);
	// 解析生成的xml
	xmlreader.read(xmlstring, function (err, res) {
		// console.log(res.xml.attributes().xmlns);
		// console.log(res.xml.block.at(0).attributes().type);
		// 遍历子节点，只有type="procedures_callnoreturn"的block才是正确的解析对象
		for(var i = 0; i < res.xml.block.count(); i++){
			if (res.xml.block.at(i).attributes().type == "procedures_callnoreturn") {
				var block = res.xml.block.at(i);
				// var b = block.mutation.arg;
				// var a = block.next.block.mutation.arg;
				// console.log(b);
				// console.log(a);
				console.log(parseXmlblock(block).toString());
			};
		}
	});
});	

