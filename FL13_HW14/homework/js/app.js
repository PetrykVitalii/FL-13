function Students(name, email) {
  this.name = function () {
    return name;
  };
  this.email = function () {
    return email;
  };
  this.homeworkResult = [];
  this.getName = function () {
    return name;
  };
  this.getEmail = function () {
    return email;
  };
  this.addHomeworkResult = function (topic, success) {
    const RESULT = {
      topic: topic,
      success: success
    };
    this.homeworkResult.push(RESULT);
  };
  this.getHomeworkResult = function () {
    return this.homeworkResult;
  };
}

function FrontendLab(listOfStudents, limit) {
  this.listOfStudents = listOfStudents;
  this.limit = limit;
  this.homeworkResult = [];
  this.addHomeworkResult = function (homeworkResults) {
    if (this.homeworkResult.some(homework => homework.topic === homeworkResults.topic)) {
      let index = this.homeworkResult.findIndex(homework => homework.topic === homeworkResults.topic)
      this.homeworkResult.splice(index, 1, homeworkResults)
    } else {
      this.homeworkResult.push(homeworkResults)
    }
  }
  this.printStudentsList = function () {
    this.listOfStudents.forEach((student) => {
      const ALL_HOMEWORK_RESULT = [];
      this.homeworkResult.forEach((homework) => {
        const RESULT = homework.results.find(
          (result) => result.email === student.email
        );
        const HOMEWORK_RESULT = {
          topic: homework.topic,
          success: RESULT.success
        };
        ALL_HOMEWORK_RESULT.push(HOMEWORK_RESULT);
      });
      console.log(`name: ${student.name}, email: ${student.email}`);
      console.log(ALL_HOMEWORK_RESULT);
    });
  };
  this.printStudentsEligibleForTest = function () {
    const LIMIT_HOMEWORK = []
    this.homeworkResult.forEach(homework => {
      homework.results.forEach(result => {
        if (LIMIT_HOMEWORK.find(student => student.email === result.email)) {
          LIMIT_HOMEWORK.forEach(student => {
            if (student.email === result.email) {
              if (!result.success) {
                student.limitFalse++
              }
            }
          })
        } else {
          const STUDENT = {
            email: result.email,
            limitFalse: 0
          }
          if (!result.success) {
            STUDENT.limitFalse++
          }
          LIMIT_HOMEWORK.push(STUDENT)
        }
      })
    })
    const trueStudents = LIMIT_HOMEWORK.filter(student => student.limitFalse <= this.limit);
    this.listOfStudents.forEach(student => {
      trueStudents.forEach(trueStudent => {
        if (student.email === trueStudent.email) {
          console.log(`name: ${student.name}, email: ${student.email}`);
        }
      })
    })
  }
}