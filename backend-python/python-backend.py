from flask import Flask
from flask_restful import Api, Resource, reqparse, fields, marshal_with, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import time
import sys


app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db = SQLAlchemy(app)



class postModel(db.Model): #creates a table for all of the questions that could be given by the user
	postId = db.Column(db.Integer, primary_key = True, nullable=False)
	userName = db.Column(db.String(30), nullable=True)
	className = db.Column(db.String(15), nullable = False)
	instructor = db.Column(db.String(15))
	postTitle = db.Column(db.String(), nullable = False)
	postBody = db.Column(db.String(), nullable = False)
	resolved = db.Column(db.Boolean, nullable = False)
	numViews = db.Column(db.Integer, nullable = False)


class answerModel(db.Model): #creates a table for all of the answers for all of the questions 
	answerId = db.Column(db.Integer, primary_key=True, nullable=False)
	postId = db.Column(db.Integer, nullable=False) #each set of answers are linked by the postId
	answerBody = db.Column(db.String(), nullable = False)



#db.create_all()
getQuestionArgs = reqparse.RequestParser() #identifies arguments for a get request on the questions table
getQuestionArgs.add_argument("postId" , type=int)
getQuestionArgs.add_argument("userName" , type=str)
getQuestionArgs.add_argument("postTitle" , type=str)
getQuestionArgs.add_argument("className", type=str)

question_put_args = reqparse.RequestParser() #identifies arguments for a put request on the questions table
question_put_args.add_argument("userName", type=str, help="Add Name: ")
question_put_args.add_argument("postTitle", type=str, help="Add Title: ")
question_put_args.add_argument("postBody", type=str, help="Add Content: ")
question_put_args.add_argument("className", type=str, help="Add Class: ")

getAnswerArgs = reqparse.RequestParser() #identifies arguments for a get request on the answers table
getAnswerArgs.add_argument("postId" , type=int) #you should only be able to find answers based on the question its posted under

answer_put_args = reqparse.RequestParser() #identifies arguments for a put request on the answers table
answer_put_args.add_argument("answerId", type=int)
answer_put_args.add_argument("answerBody", type=str)
answer_put_args.add_argument("postId", type=str, help="add postid", nullable=False)

#resource field used to convert database object of question to json object
resource_fields = {
    'postId' : fields.Integer,
    'userName' : fields.String,
    'className' : fields.String,
    'instructor' : fields.String,
    'postTitle' : fields.String,
    'postBody' : fields.String,
    'resolved' : fields.Boolean,
    'numViews' : fields.Integer,
}

#resource field used to convert database object of answer to json object
resource_fields2 = {
    'answerId' : fields.Integer,
    'postId' : fields.Integer,
    'answerBody' : fields.String
}

class Questions (Resource):
	#QUESTIONID = 0 #a static variable that can be used to count how many questions have been posted, and then use that number as the primary key for the database table

	@marshal_with(resource_fields)
	def get(self, numElements):
		
		args = getQuestionArgs.parse_args()
		print(args['postTitle'])
		result = postModel.query.all()

		if (str(args['postTitle']) != 'None'):
			x = "%"+args['postTitle']+"%"
			result = db.session.query(postModel).filter(postModel.postTitle.like(x))
			#result = postModel.query.filter(postModel.postTitle.like(x)).all()
			print(result)
		elif (str(args['postId']) != 'None'):
			result=postModel.query.filter_by(postId= args['postId']).all()
		else:
			result = postModel.query.all()
		
		 #queries the database for the title of the post
		zooga = []
		
		if (numElements == 1):
			print(numElements)
			for i in result:
				print(i)
				zooga.append(i)
			return zooga


		booga = [];
		for i in range(numElements):
			print('Hello world!', file=sys.stdout)
			if ((len(result)-i) >=0):
				booga.append(result[len(result)-i-1])
			else:
				break
			# booga.append(result[i])
		 

		return booga

	@marshal_with(resource_fields)
	def put (self, numElements):
		args = question_put_args.parse_args()

		milliseconds = int(round(time.time() * 1000))

		result = postModel.query.filter_by(postId=milliseconds).first() #checks to make sure there isint a post with the same Id in the table
		if (result):
			abort(409, message="post already exists")

		
		question = postModel( #initializes the new question object 
			postId = milliseconds, 
			userName=args['userName'],
			postTitle=args['postTitle'],
			postBody=args['postBody'],
			className=args['className'],
			resolved=False,
			numViews=0  )

		# Questions.QUESTIONID = Questions.QUESTIONID + 1 #updates question id so that a new one can be inserted

		db.session.add(question)
		db.session.commit()
		return question, 201

api.add_resource(Questions, "/Questions/<int:numElements>")

class Answers (Resource):
    ANSWERID = 0
    @marshal_with(resource_fields2)
    def get(self):
        args = getAnswerArgs.parse_args()
        result = answerModel.query.filter_by(postId=args['postId']).all() #returns the answer with all of the answers under the same question id
        return result

    @marshal_with(resource_fields2)
    def put(self):
        args = answer_put_args.parse_args()
        milliseconds = int(round(time.time() * 1000))
        answer = answerModel(answerId = milliseconds, answerBody=args['answerBody'], postId=args['postId'])
        db.session.add(answer)
        db.session.commit()
        return answer, 201
api.add_resource(Answers, "/Answers")#trying just normal parameters because nothing is fucking working



if __name__ == "__main__" :
	app.run(debug=True, port=8080)
