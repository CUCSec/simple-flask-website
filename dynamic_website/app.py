# -*- coding=utf8 -*-

# 从 flask 中导入一个可以用于实例化 WSGI app的类
from flask import Flask, render_template, request, jsonify
import os

# 实例化这个 WSGI 类
# ref: http://flask.pocoo.org/docs/latest/api/#flask.Flask
app = Flask(__name__)


@app.route('/data')
def data():
  page = request.args.get('page', default=1)

  current_dir = os.path.dirname(os.path.abspath(__file__))
  filename = os.path.join(current_dir, 'students.txt')

  students = []
  with open(filename, encoding='utf8') as f:
    for line in f:
      students.append(line.strip())

  start = (int(page) - 1) * 20
  end = len(students) if int(page) * 20 > len(students) else int(page) * 20

  result = {'data': students[start:end]}
  return jsonify(result)


@app.route('/')
def index():
  return render_template('index.html')


# __name__ 取值为 __main__ 说明当前py是程序的主入口
# 否则，说明当前py是以导入包的方式运行的
if __name__ == '__main__':
  app.run(debug=True)
