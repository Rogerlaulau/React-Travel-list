# import os
# from flask import Flask, flash, request, redirect, url_for
# from werkzeug.utils import secure_filename

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

#traveling info from https://www.pinterest.com/search/pins/?q=travel%20%20hong%20kong&rs=typed&term_meta[]=travel%7Ctyped&term_meta[]=hong%7Ctyped&term_meta[]=kong%7Ctyped

pagelist1 = {"page":1,"per_page":3,"total":6,"total_pages":2,"data":[
        {"id":1,"title":"15 Best Things To Do In Hong Kong","description":"Hong Kong is an incredible place to explore. Not only Is it a perfect mix of vibrant, busy, hectic and historic, it’s also got a heap of the best things to do in Hong Kong that are dotted all across the area.","avatar":"http://localhost:4000/uploads/1.jpg", "readmore": "https://handluggageonly.co.uk/2017/03/31/14-things-you-need-to-see-and-do-in-hong-kong/"},
        {"id":2,"title":"10 Unforgettable Things To Do In Hong Kong","description":"Hong Kong, undoubtedly one of my favorite places on earth. Hong Kong is a vibrant place, a place that will make you feel alive, but will still give you the possibility of peace and quietness whenever you want to.","avatar":"http://localhost:4000/uploads/2.jpg", "readmore": "https://www.omnivagant.com/10-things-hong-kong/"},
        {"id":3,"title":"Hong Kong Itinerary 3 days","description":"Sip on a cocktail while you cruise the harbour on the best seat in town while watching the spectacular skyline illuminate during the Symphony of Light show (show at 8 pm).","avatar":"http://localhost:4000/uploads/3.jpg", "readmore": "https://travel2next.com/hong-kong-itinerary-3-days/"}]
    }


pagelist2 = {"page":2,"per_page":3,"total":6,"total_pages":2,"data":[
        {"id":4,"title":"11 Must-Do Experiences in Hong Kong","description":"Planning a holiday in Hong Kong? Discover the 11 best things to do in Hong Kong based on my travel experiences in the city, from shopping to the seaside.","avatar":"http://localhost:4000/uploads/4.jpg", "readmore": "http://stylishtravlr.com/11-must-do-experiences-in-hong-kong/"},
        {"id":5,"title":"The Ultimate Guide to Temples of Hong Kong (ALL free entry!)","description":"Hong Kong has no shortage of temples, and as a Buddhist and Taoist based population for the majority of its history, it shouldn’t surprise anyone","avatar":"http://localhost:4000/uploads/5.jpg", "readmore": "https://www.laughtraveleat.com/asia/hong-kong-temples-ultimate-guide/"},
        {"id":6,"title":"12 Easy Hong Kong Day Trip Ideas for When You Need a Change of Scenery","description":"If you're looking to add even more things to do to your Hong Kong itinerary, read on for 12 fantastic day trips from Hong Kong that don't involve too much hassle and travel time!","avatar":"http://localhost:4000/uploads/6.jpg", "readmore": "https://www.yogawinetravel.com/12-easy-hong-kong-day-trip-ideas-for-when-you-need-a-change-of-scenery/"}]
    }

@app.route("/status")
def status():
    return ("ok")

@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

@app.route('/page/<pagenum>')
def page(pagenum):
    if pagenum == "1":
        return jsonify(pagelist1)
    elif pagenum == "2":
        return jsonify(pagelist2)
    else:
        return jsonify({"page": None})
        




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4000, debug=True)