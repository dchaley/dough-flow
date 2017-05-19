import webapp2


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'

        # write a json object of the format: {data: [obj_1, ... obj_n]}
        self.response.write('''{"data":
     [{
        "type": "cashflow",
        "id": "grand-old-mansion",
        "attributes": {
          "title": "Grand Old Mansion",
          "owner": "Veruca Salt",
          "city": "San Francisco",
          "type": "Estate",
          "bedrooms": 15,
          "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg"
        }
      }, {
        "type": "cashflow",
        "id": "urban-living",
        "attributes": {
          "title": "Urbannnn Living",
          "owner": "Mike Teavee",
          "city": "Seattle",
          "type": "Condo",
          "bedrooms": 1,
          "image": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg"
        }
      }, {
        "type": "cashflow",
        "id": "downtown-charm",
        "attributes": {
          "title": "Downtown Charm",
          "owner": "Violet Beauregarde",
          "city": "Portland",
          "type": "Apartment",
          "bedrooms": 3,
          "image": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg"
        }
      }]
          }''')
        # end of response


# TODO debug flag should come from config

app = webapp2.WSGIApplication([
    ('/api/cashflows', MainPage),
], debug=True)
