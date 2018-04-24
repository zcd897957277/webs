# dataformat.js
1. 作用： 格式化日期，使得可以变换格式为yyyy-MM-dd
2. 用法：new Date().format('yyyy-MM-dd');

# jquery.datetimepicker.js and jquery.datetimepicker.css
1. bootstrap.js的日期插件
2. 用法：#date只要将input元素的id设置为该id
  - $("#date").datetimepicker({
  -      lang: 'ch', endDate: "Today",
  -      format: 'Y-m',
  -      datepicker: true,
  -      timepicker: false
  - });

  - $("#date").val(new Date().format("yyyy-MM-dd"));

