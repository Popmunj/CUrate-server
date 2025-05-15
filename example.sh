# fetch all 
# curl -X GET https://curate-server-mauve.vercel.app/restaurant 

# case sensitive: 1. name 2. foodOrigin 3. priceRange 4. location
# curl -X GET https://curate-server-mauve.vercel.app/restaurant?foodOrigin=Japan&priceRange=2 

# greater than or equal: 5. rating
# curl -X GET https://curate-server-mauve.vercel.app/restaurant?rating=2 

# # match any in the array: 6. tags
# # in postman or js, use tags=["Item1", "Item2"]
# curl -X GET https://curate-server-mauve.vercel.app/restaurant?tags=%5B%22Item1,Item2%22%5D

