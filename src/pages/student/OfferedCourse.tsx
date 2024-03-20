import { Button, Col, Row } from 'antd';
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from '../../redux/features/student/studentCourseManagement.api';

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: 'solid #d4d4d4 2px' }}>
            <div style={{ padding: '10px' }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{' '}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;

// [
//   { course: { title: 'React' }, section: 1, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'React' }, section: 2, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'Redux' }, section: 1, _id: 'sdfasdfasdfas45345' },
// ];

// [
//   {
//     courseTitle: 'React',
//     sections: [
//       { section: 1, _id: 'ADFa4345basdfa' },
//       { section: 2, _id: 'ADFa4345basdf3' },
//     ],
//   },
//   {
//     courseTitle: 'Redux',
//     sections: [{ section: 1, _id: 'ADFa4345basdfa' }],
//   },
// ];
