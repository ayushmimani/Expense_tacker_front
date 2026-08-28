# install vite+react
# install react-router-dom
# install redux/toolkit
  ## createSlice
  ## creste store
# install React Hook Form + Zod

# I used FileReader to read the file, split rows and columns manually, validated data, converted to JSON, and sent to backend for bulk insert.

# JSON.stringify  -> array/object ko string banana
# JSON.parse() -> String → Object
# 'Content-Type': 'application/json' -> Ye server ko batata hai ki jo data main bhej raha hu wo JSON format me hai

# Create api main data retun hota so new object like return Document :after use krne ke jarrurt nhi hote hai

# upload csv main date format dd/mm/yyyy the but Mongoose is string ko JavaScript ke new Date("16/08/2026") se parse karne ki koshish karta hai, aur ye fail ho jaata hai kyunki:
  ## JS ka native Date constructor DD/MM/YYYY format ko reliably samajhta nahi hai
  ## Ye is format ko MM/DD/YYYY samajhne ki koshish karta hai (US style), aur 16 ko month nahi bana sakta (max 12 hota hai) → parsing fail → Invalid Date → Mongoose validation error

# create a custom hook for animation count by using browser api - RequestAnimationFrame   

# fetch main   credentials: "include",  us kret hai or axios main  withCredentials: true, 

# Frontend — credentials: "include" (fetch) ya withCredentials: true (axios) → "main cookie bhejna/receive karna chahta hoon"
# Backend — cors({ origin: exact_frontend_url, credentials: true }) → "haan main is specific origin ko cookie access permission deta hoon"


# install npm install react-router-dom

# install jest supertest

# jest — testing framework (test likhne aur run karne ke liye)
# supertest — API endpoints ko bina real server chalaye test karne ke liye
# mongodb-memory-server — fake temporary MongoDB, taaki real database touch na ho

# Live URL
- https://expense-tacker-front.vercel.app/