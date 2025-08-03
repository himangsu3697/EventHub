const sampleEvents = [
  {
    "title": "Tech Summit 2023",
    "description": "Annual technology conference featuring AI, blockchain, and cloud computing innovations",
    "image": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    "price": 299,
    "date": "2023-11-15T09:00:00Z",
    "venue": "Moscone Center, San Francisco",
    "capacity": 1000
  },
  {
    "title": "Jazz in the Park",
    "description": "Outdoor jazz festival with food trucks and local artists",
    "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 35,
    "date": "2023-09-22T17:00:00Z",
    "venue": "Central Park, New York",
    "capacity": 500
  },
  {
    "title": "Yoga Retreat Weekend",
    "description": "Beginner-friendly yoga and meditation retreat",
    "image": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 120,
    "date": "2023-10-14T07:00:00Z",
    "venue": "Mountain View Resort, Colorado",
    "capacity": 50
  },
  {
    "title": "Startup Pitch Competition",
    "description": "Early-stage startups compete for funding and mentorship",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 0,
    "date": "2023-11-03T13:00:00Z",
    "venue": "Innovation Hub, Austin",
    "capacity": 200
  },
  {
    "title": "Wine Tasting Experience",
    "description": "Sample premium wines from local vineyards",
    "image": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    "price": 65,
    "date": "2023-10-28T15:00:00Z",
    "venue": "Sunset Vineyards, Napa Valley",
    "capacity": 100
  },
  {
    "title": "Marathon 2023",
    "description": "Annual city marathon with 5K, 10K, and full marathon options",
    "image": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 85,
    "date": "2023-11-05T06:30:00Z",
    "venue": "Downtown City Streets",
    "capacity": 5000
  },
  {
    "title": "Blockchain Workshop",
    "description": "Hands-on workshop about building decentralized applications",
    "image": "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "price": 149,
    "date": "2023-10-17T10:00:00Z",
    "venue": "Tech Hub, Seattle",
    "capacity": 100
  },
  {
    "title": "Indie Music Festival",
    "description": "3-day festival featuring emerging indie artists",
    "image": "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 120,
    "date": "2023-09-29T16:00:00Z",
    "venue": "Riverside Park, Chicago",
    "capacity": 3000
  },
  {
    "title": "Digital Art Exhibition",
    "description": "Immersive digital art experience with VR installations",
    "image": "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 25,
    "date": "2023-10-05T11:00:00Z",
    "venue": "Modern Art Gallery, Miami",
    "capacity": 200
  },
  {
    "title": "Cooking Masterclass",
    "description": "Learn gourmet cooking techniques from a Michelin-star chef",
    "image": "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 180,
    "date": "2023-11-11T14:00:00Z",
    "venue": "Culinary Institute, Boston",
    "capacity": 30
  },
  {
    "title": "Hackathon 2023",
    "description": "48-hour coding competition with $10,000 in prizes",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    "price": 0,
    "date": "2023-10-21T09:00:00Z",
    "venue": "University Tech Center, Austin",
    "capacity": 150
  },
  {
    "title": "Photography Workshop",
    "description": "Professional photography techniques for beginners",
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    "price": 75,
    "date": "2023-10-08T10:00:00Z",
    "venue": "Creative Space, Portland",
    "capacity": 25
  },
  {
    "title": "Comedy Night",
    "description": "Stand-up comedy showcase featuring top comedians",
    "image": "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 40,
    "date": "2023-11-18T20:00:00Z",
    "venue": "Laugh Factory, Los Angeles",
    "capacity": 300
  },
  {
    "title": "Science Fair",
    "description": "Interactive exhibits showcasing cutting-edge scientific research",
    "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 15,
    "date": "2023-10-14T09:00:00Z",
    "venue": "Science Museum, Washington DC",
    "capacity": 500
  },
  {
    "title": "Salsa Dancing Night",
    "description": "Beginner salsa lesson followed by social dancing",
    "image": "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    "price": 20,
    "date": "2023-11-04T19:00:00Z",
    "venue": "Latin Dance Studio, New York",
    "capacity": 80
  },
  {
    "title": "Book Launch",
    "description": "Meet the author and get signed copies of the new bestseller",
    "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 0,
    "date": "2023-10-29T18:00:00Z",
    "venue": "Downtown Bookstore, Chicago",
    "capacity": 120
  },
  {
    "title": "Mixology Class",
    "description": "Learn to craft cocktails from professional mixologists",
    "image": "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 65,
    "date": "2023-11-09T19:00:00Z",
    "venue": "Craft Cocktail Bar, San Diego",
    "capacity": 20
  },
  {
    "title": "Cybersecurity Seminar",
    "description": "Learn how to protect your business from cyber threats",
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 99,
    "date": "2023-10-25T13:00:00Z",
    "venue": "Business Center, Dallas",
    "capacity": 150
  },
  {
    "title": "Farmers Market",
    "description": "Weekly market featuring local produce and handmade goods",
    "image": "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "price": 0,
    "date": "2023-10-28T08:00:00Z",
    "venue": "Town Square, Boulder",
    "capacity": 1000
  },
  {
    "title": "Astronomy Night",
    "description": "Stargazing event with professional telescopes and guides",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80",
    "price": 12,
    "date": "2023-11-12T19:30:00Z",
    "venue": "Desert Observatory, Arizona",
    "capacity": 100
  }
];

module.exports = sampleEvents;