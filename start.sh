cd DigitalSchoolDiary/schooldiary;
echo "DigitalSchoolDiary started";
pm2 start ./app.js;
cd ../../;
cd FrontendSchoolDiary/schooldiary;
npm run start;
echo "FrontendSchoolDiary started";