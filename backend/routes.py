from app import db,app
from flask import jsonify,request
from models import Friend

@app.route("/api/friends",methods = ["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

@app.route("/api/friends",methods=["POST"])
def create_friend():
    try:
        data = request.json

        required  = ["name","gender","role","description"]

        for i in required:
            if i not in data:
                return jsonify({"error" : f"Missing {i} field."})

        name = data.get('name')
        gender = data.get('gender')
        role = data.get('role')
        description = data.get('description')
        
        if gender == "male":
            image_url = f'https://avatar.iran.liara.run/username?username={name}'
        elif gender == 'female':
            image_url = f'https://avatar.iran.liara.run/username?username={name}'
        else:
            image_url = None
        
        new_friend = Friend(name = name,gender = gender,role = role, description = description,image_url = image_url)

        db.session.add(new_friend)

        db.session.commit()

        return jsonify({new_friend.to_json()}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error" : str(e)}),500

@app.route("/api/friends/<int:id>",methods = ["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error" : "Friend is Not Found."}),404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"error" : "Friend is Deleted Successfully."})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error" : str(e)}),500


@app.route("/api/friends/<int:id>",methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)

        if friend is None:
            return jsonify({"error" : "Friend is Not Found."}),404
        
        data = request.json

        friend.name  = data.get('name',friend.name)
        friend.role  = data.get('role',friend.role)
        friend.description  = data.get('description',friend.description)
        friend.gender  = data.get('gender',friend.gender)
        
        db.session.commit()

        return jsonify(friend.to_json()),200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error" : str(e)}),500