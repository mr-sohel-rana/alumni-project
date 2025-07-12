 import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Home = () => {
  const [carosel, setCarosel] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all carousel images
  const alldata = () => {
    axios
      .get('http://localhost:5000/api/v1/allimage')
      .then((response) => {
        setCarosel(response.data.result || []);
      })
      .catch((error) => {
        console.error("Error fetching carousel data", error);
        setError("Failed to load carousel images");
      })
      .finally(() => setLoadingCarousel(false));
  };

  // Fetch users
  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/api/v1/read')
      .then((response) => {
        setUsers(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setError("Failed to load users");
      })
      .finally(() => setLoadingUsers(false));
  };

  useEffect(() => {
    alldata();
    fetchUsers();
  }, []);

  // Render user card by role
    const renderUserCard = (user) => (
  <div
    key={user._id}
    className="card shadow m-3"
    style={{ width: '25rem', borderRadius: '0.5rem' }}
  >
    <img
      src={user.image ? `http://localhost:5000/uploads/${user.image}` : 'https://via.placeholder.com/150'}
      className="card-img-top"
      alt={user.name}
      style={{ height: '300px', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }}
    />
    <div
      className="card-body d-flex flex-column align-items-center"
      style={{ textAlign: 'center' }}
    >
      <p className="card-text mb-1">
        <strong>Role:</strong> {user.role === 1 ? 'Admin' : user.role === 2 ? 'Sir' : 'Other'}
      </p>
      <p className="card-text mb-3">
        <strong>Profession:</strong> {user.profession || 'N/A'}
      </p>
      <h5
        className="card-title"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
      >
        {user.name}
      </h5>
    </div>
  </div>
);



  return (
    <Layout>
      {/* Carousel Section */}
      <div
        id="carouselExampleInterval"
        className="container carousel slide my-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {loadingCarousel ? (
            <div className="text-center py-5">Loading carousel...</div>
          ) : carosel.length > 0 ? (
            carosel.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                key={img._id}
                data-bs-interval={2000}
              >
                <div className="position-relative">
                  <img
                    src={`http://localhost:5000/uploads/${img.image}`}
                    className="d-block w-100"
                    alt="Carousel"
                    style={{ objectFit: 'cover', maxHeight: '400px' }}
                  />
                  
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="position-relative">
                <img
                  src="https://via.placeholder.com/800x400"
                  className="d-block w-100"
                  alt="Placeholder"
                />
                <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                  <h3 className="text-primary">No Images Available</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      

      {/* about our alumni */}
<section className="about-alumni py-5 bg-light">
  <div className="container">
    <h2 className="text-center  mb-4 text-primary fw-bold"> রক্ত কেন দেবেন? এর উপকারিতা কী?</h2>
    <div className="row justify-content-center">
      <div className="col-md-10">
       <div
  className="card shadow text-white border-0 rounded-4 p-4"
  style={{ backgroundColor: "#008080" }} // a light sky blue
>
 <p className='fs-5'>
   
   প্রতি কয়েক সেকেন্ডে, পৃথিবীতে কারো না কারো রক্তের প্রয়োজন হয়। সন্তান জন্মদানকারী মা, ক্যান্সারে আক্রান্ত শিশু, অথবা দুর্ঘটনার শিকার, দান করা রক্ত ​​জীবন বাঁচাতে গুরুত্বপূর্ণ ভূমিকা পালন করে। তবুও, অনেক হাসপাতাল এবং ব্লাড ব্যাংক প্রায়শই ঘাটতির সম্মুখীন হয়। এই কারণেই স্বেচ্ছায় রক্তদান কেবল একটি সদয় অঙ্গভঙ্গি নয় - এটি একটি জীবন রক্ষাকারী অভ্যাস।

এই ব্লগে ব্যাখ্যা করা হয়েছে কেন নিয়মিত রক্তদান এত গুরুত্বপূর্ণ, এটি কীভাবে দাতা এবং গ্রহীতা উভয়কেই সাহায্য করে এবং কেন কন্টিনেন্টাল হাসপাতাল সকলকে এই মহৎ কাজের অংশ হতে উৎসাহিত করে।

রক্তদান কেন আগের চেয়ে বেশি গুরুত্বপূর্ণ
রক্ত তৈরি করা যায় না। রক্তের একমাত্র উৎস হল একজন সুস্থ মানুষ যিনি দান করতে ইচ্ছুক। চিকিৎসা ক্ষেত্রে অগ্রগতি সত্ত্বেও, হাসপাতালের চাহিদা মেটাতে আমরা এখনও সম্পূর্ণরূপে রক্তদাতাদের উপর নির্ভর করি।

রক্তদান কেন গুরুত্বপূর্ণ তার কিছু গুরুত্বপূর্ণ কারণ এখানে দেওয়া হল:

অ্যাপয়েন্টমেন্টের প্রয়োজন? 
জরুরি অবস্থা এবং দুর্ঘটনা: সড়ক দুর্ঘটনা, অগ্নিদগ্ধ বা প্রাকৃতিক দুর্যোগের মতো আঘাতজনিত ক্ষেত্রে প্রায়শই রক্তের প্রয়োজন হয়। তাৎক্ষণিকভাবে রক্তের সরবরাহ কয়েক মিনিটের মধ্যেই জীবন বাঁচাতে পারে।

অস্ত্রোপচারের প্রয়োজন: অনেক বড় অস্ত্রোপচারের আগে, সময়কালে বা পরে রক্ত ​​সঞ্চালনের প্রয়োজন হয়।

ক্যান্সারের চিকিৎসা: ক্যান্সার রোগীদের, বিশেষ করে যারা কেমোথেরাপি নিচ্ছেন, তাদের প্রায়শই নিয়মিত রক্ত ​​এবং প্লেটলেটের প্রয়োজন হয়।

রক্তের ব্যাধি: থ্যালাসেমিয়া, হিমোফিলিয়া এবং সিকেল সেল অ্যানিমিয়ার মতো রোগে ভুগছেন এমন ব্যক্তিরা বেঁচে থাকার জন্য নিয়মিত রক্ত ​​সঞ্চালনের উপর নির্ভর করেন।

মাতৃত্বকালীন যত্ন: প্রসবকালীন জটিলতার কারণে প্রচুর রক্তপাত হতে পারে, যার ফলে মায়েদের বাঁচাতে দান করা রক্ত ​​অপরিহার্য হয়ে পড়ে।

আপনার রক্ত ​​জীবন বাঁচাতে পারে। আজই দাতা হোন—জীবন পরিবর্তনের জন্য কন্টিনেন্টাল হসপিটালের সাথে যোগাযোগ করুন।
 </p>
        </div>
      </div>
    </div>
  </div>
</section>


    {/* about our alumni */}
<section className="about-alumni py-5 bg-light">
  <div className="container">
    <h2 className="text-center  mb-4 text-primary fw-bold">কেন আপনি রক্তদান করবেন?</h2>
    <div className="row justify-content-center">
      <div className="col-md-10">
       <div
  className="card shadow text-white border-0 rounded-4 p-4"
  style={{ backgroundColor: "#008080" }} // a light sky blue
>
 <p className='fs-5'>
  ভোগে নয় ত্যাগেই প্রকৃত সুখ’,- এ কথা আমরা সবাই জানি। কিন্তু মানি কত জন? আপনার একটি ভালো চিন্তা, একটি মহৎ উদ্দ্যোগ, একটি ভালো কাজ একটি সমাজের কল্যাণ সাধনে আসতে পারে। এরূপ একটি কল্যাণকর কাজ হলো ‘রক্তদান’।

মানবদেহের একটি অপরিহার্য উপাদান হচ্ছে রক্ত। রক্তের বিকল্প শুধু রক্তই। চিকিৎসা বিজ্ঞানে আজ পর্যন্ত রক্তের কোন বিকল্প আবিস্কার হয়নি। রক্তের অভাবে যখন কোন মানুষ মৃত্যুর মুখোমুখি দাঁড়ায় তখন অন্য একজন মানুষের দান করা রক্তই তার জীবন বাঁচাতে পারে। তাই এর চেয়ে মহৎ কাজ আর হতে পারে না।

১৬ কোটি মানুষের এদেশে স্বেচ্ছা রক্তদাতার সংখ্যা খুবই কম।

বাংলাদেশে প্রতিবছর প্রায় সাত লক্ষ ব্যাগ নিরাপদ ও সুস্থ রক্তের চাহিদা রয়েছে। এর বিপরীতে মাত্র ২৬ ভাগ রক্ত সংগৃহীত হয় স্বেচ্ছা রক্তদাতার মাধ্যমে। বাকি ৭৪ ভাগ রক্তের জন্য রোগীরা ছুটে যায় আত্মীয়-স্বজন, বন্ধু-বান্ধবসহ পরিচিতজনদের কাছে। সেখানেও ব্যর্থ হলে তারা পেশাদার রক্ত বিক্রেতার স্মরণাপন্ন হয়।

যখন পৃথিবীতে ছড়িয়ে পড়ছে অশান্তি, সংঘাত আর বিদ্বেষের বাষ্প, ঠিক তখনই আমরা পারি পৃথিবীতে ভালোবাসা ছড়িয়ে দিয়ে এক স্বগীর্য় পরিবেশ তৈরি করতে। সামাজিক বন্ধন যেখানে প্রায় ভঙ্গুর, সেখানেই এই মহৎ কাজটি একটি সমাজের কল্যাণ সাধনে কাজ করতে পারে।

রক্তদান এমনই একটি প্রক্রিয়া, যেখানে অর্থ ছাড়াই শারীরিকভাবে সুস্থ একজন পূর্ণ বয়স্ক ব্যক্তি পারেন পরম সুখের অধিকারী হতে। তবে এ জন্য প্রয়োজন হবে, শুধুই স্বইচ্ছা।

আমরা হয়তো চিন্তাই করতে পারি না বা চিন্তায় আসেও না যে, হাসপাতালে প্রতিদিন অসংখ্য মানুষের রক্তের প্রয়োজন হয় কিন্তু তারা রক্তের অভাবে চিকিৎসা বা অপারেশন করাতে পারছেন না। হয়তো যারা ধনী তারা অন্যত্র থেকে অর্থের বিনিময়ে কিনতে পারছেন কিন্তু যারা গরিব তারা মানুষের দ্বারে দ্বারে ঘুরছেন, আর আপনার আমার মতো মানুষের দিকে চেয়ে আছেন। তবে আশার বিষয় হলো, রক্তদানে সহায়তা করে এরূপ মানুষের জীবন বাঁচাতে এগিয়ে আসছে অসংখ্য সামাজিক সংগঠন।

এরমধ্যে সরকারি বিশ্ববিদ্যালয়সহ বিভিন্ন জাতীয় বিশ্ববিদ্যালয়গুলোতে কাজ করে যাচ্ছে ‘বাঁধন’, এ ছাড়া সরকারি মেডিকেল কলেজগুলোতে কাজ করছে ‘সন্ধানী’ সংগঠনটি। এদের বাইরে দেশের একটি বড় অংশ রক্তের যোগানি দিচ্ছি কোয়ান্টাম ফাউন্ডেশন। তবে অনেকেই স্থানীয় পর্যায়ে, নিজেদের উদ্যোগে এলাকাভিত্তিকভাবে রক্তদান করতে ক্লাব গঠন করেছেন। আপনারাও পারেন আপনার এলাকাতে এরূপ স্বেচ্ছাসেবী সামাজিক সংগঠন গড়ে তুলতে। যা থেকে আপনি এবং আপনার এলাকাবাসী পেতে পারে বিবিধ উপকারসহ একটি ভালোবাসার দৃঢ় বন্ধন।

আসুন জেনে নিই রক্তদানের উপকারিতা-
মানসিক তৃপ্তি
আমি একজনের জীবন বাঁচাতে সাহায্য করেছি, আমি অবশ্যই একটি ভালো কাজ করেছি।

বিনামূল্যে রক্ত পরীক্ষার রিপোর্ট
এইচ আইভি, ম্যালেরিয়া, হেপাটাইটিস-বি ও সি, সিফিলিস ইত্যাদি রোগের রিপোর্ট।

গবেষণায় দেখা গেছে, রক্তদানের ফলে লোহিত রক্ত কনিকা তৈরির প্রক্রিয়া ত্বরান্বিত হয়, হাড়ের অস্থিমজ্জার রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি পায়।

রক্তদানের কয়েক সপ্তাহের মধ্যে শ্বেত কনিকা এবং ৪ মাসের মধ্যে লোহিত কনিকা পূরণ হয়ে যায়।

রক্তদানকারীর নিম্নোক্ত যোগ্যতা থাকতে হবে-
বয়স হতে হবে ১৮-৫৭। ওজন থাকতে হবে পুরুষ-৪৭, নারী-৪৫ কেজি। রক্তচাপ (১৫০/১০০-১০০/৫০) স্বাভাবিক হতে হবে। মোটকথা শারীরিক এবং মানসিকভাবে সুস্থ থাকতে হবে। রক্তদাতা প্রতি চার মাস অন্তর রক্ত দিতে পারবে।

রক্তদানের ক্ষেত্রে লক্ষ্য রাখবেন-
ভাইরাস জ্বর সুস্থ হওয়ার ৭ দিন পর। ডেঙ্গু থেকে সুস্থ হওয়ার কমপক্ষে ৬ মাস পর। ম্যালেরিয়া থেকে সুস্থ হওয়ার ১ বছর পর। টাইফয়েড, বসন্ত থেকে সুস্থ হওয়ার ৬ মাস পর। রক্তস্বল্পতা, মৃগীরোগ, একজিমা হলে দেয়া যাবে না। নারীদের ক্ষেত্রে অন্তঃসত্ত্বা ও মাসিক চলাকালীন দেয়া যাবে না।

কখনোই রক্ত দিতে পারবে না-
এইচআইভি পজেটিভ হলে, সিরিঞ্জের মাধ্যমে মাদক নিলে, ক্যান্সার, হৃদরোগ, বাতজ্বর, সিফিলিস (যৌনরোগ), কুষ বা শ্বেতী ও যে কোন রক্তবাহিত রোগ হলে রক্ত দান থেকে বিরত থাকুন।

মনে রাখতে হবে
খালি পেটে রক্ত দেয়া যাবে না। রক্তদানের পূর্বে ও পরে পানি পান করতে হবে। রক্তদানের পর ২০-৩০ মিনিট বিশ্রাম নিন। রক্তদানের পর ১ ঘণ্টার মধ্যে ভারী খাবার না খাওয়া।

রক্তদান পৃথিবীর পুণ্য কাজগুলোর মধ্যে একটি অন্যতম। আমার শরীরের ৫০০ মি.লি. রক্তে আরেকটি জীবন রক্ষা হচ্ছে। পৃথিবীর আলো, বাতাস উপভোগের অপার সুযোগ তৈরি হচ্ছে। মোট কথা, আপনি জীবনে জীবন সরবরাহ করছেন। এর থেকে বড় কর্ম পৃথিবীতে আর দ্বিতীয়টি আছে কিনা জানা নেই। কত বিরাট পাওয়া, কত বিশাল অজর্ন। পরোপকারই হোক আমাদের জীবনের ব্রত। একের রক্ত অন্যের জীবন, রক্তই হোক আত্মার বাঁধন।
 </p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* User Cards by Role */}
      <div className="container my-5">
        {loadingUsers ? (
          <div className="text-center">Loading users...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            {/* Admins */}
            <h3 className="text-center text-primary mb-4">Our Admins</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 1).length > 0 ? (
                users.filter((u) => u.role === 1).map((admin) => renderUserCard(admin))
              ) : (
                <p className="text-center">No Admins found.</p>
              )}
            </div>

            {/* Sirs */}
            <h3 className="text-center text-success mt-5 mb-4">Our Sirs</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 2).length > 0 ? (
                users.filter((u) => u.role === 2).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
            {/* advisor */}
            <h3 className="text-center text-success mt-5 mb-4">advisor</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 3).length > 0 ? (
                users.filter((u) => u.role === 3).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
            {/* presedent */}
            <h3 className="text-center text-success mt-5 mb-4">presedent</h3>
            <div className="d-flex flex-wrap justify-content-center">
              {users.filter((u) => u.role === 5).length > 0 ? (
                users.filter((u) => u.role === 5).map((sir) => renderUserCard(sir))
              ) : (
                <p className="text-center">No Sirs found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
