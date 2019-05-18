let db = connect('school');
let startTime = Date.now();
// cursor就是游标
let cursor = db.user.find({age: 999999});
cursor.forEach(item => {
  printjson(item);
})
print(Date.now() - startTime);