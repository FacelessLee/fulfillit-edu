
import { Subject, Topic, Resource } from '@/models/curriculum';
import { nigerianSubjects } from '@/models/curriculum';

// Mock subjects data
const mockSubjects: Subject[] = nigerianSubjects.map((name, index) => ({
  id: `subject-${index + 1}`,
  name,
  code: name.split(' ').map(word => word[0]).join('').toUpperCase(),
  description: `${name} for secondary school students following the Nigerian curriculum.`,
  topics: []
}));

// Add some topics to the subjects
mockSubjects.forEach(subject => {
  for (let i = 1; i <= 3; i++) {
    const topicId = `topic-${subject.id}-${i}`;
    const topic: Topic = {
      id: topicId,
      title: `Week ${i}: Introduction to ${subject.name} - Part ${i}`,
      description: `This topic covers the fundamental concepts of ${subject.name}.`,
      subjectId: subject.id,
      content: `<h2>Learning Objectives</h2>
      <ul>
        <li>Understand the basic principles of ${subject.name}.</li>
        <li>Apply these principles to real-world scenarios.</li>
        <li>Develop critical thinking skills in ${subject.name}.</li>
      </ul>
      <h2>Content</h2>
      <p>This is the main content for ${subject.name} Week ${i}. The teacher will add more detailed information here.</p>`,
      resources: [],
      order: i
    };
    
    // Add some resources to each topic
    const resourceTypes: Array<'pdf' | 'video' | 'image' | 'link' | 'document'> = ['pdf', 'video', 'link'];
    for (let j = 1; j <= 2; j++) {
      const resourceType = resourceTypes[(i + j) % resourceTypes.length];
      const resource: Resource = {
        id: `resource-${topicId}-${j}`,
        title: `${subject.name} ${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} Resource ${j}`,
        type: resourceType,
        url: `https://example.com/${subject.name.toLowerCase().replace(/\s+/g, '-')}/${resourceType}/${j}`,
        topicId: topicId
      };
      topic.resources.push(resource);
    }
    
    subject.topics = subject.topics || [];
    subject.topics.push(topic);
  }
});

// Map to store subject assignments to teachers
const teacherSubjects: Record<string, string[]> = {
  // Mock data - teacher ID -> array of subject IDs
  '2': [mockSubjects[0].id, mockSubjects[1].id, mockSubjects[2].id]
};

const studentSubjects: Record<string, string[]> = {
  // Mock data - student ID -> array of subject IDs
  '1': [mockSubjects[0].id, mockSubjects[1].id, mockSubjects[2].id, mockSubjects[3].id]
};

export const getSubjectById = (subjectId: string): Subject | undefined => {
  return mockSubjects.find(subject => subject.id === subjectId);
};

export const getSubjectByCode = (code: string): Subject | undefined => {
  return mockSubjects.find(subject => subject.code === code);
};

export const getAllSubjects = (): Subject[] => {
  return [...mockSubjects];
};

export const getTeacherSubjects = (teacherId: string): Subject[] => {
  const subjectIds = teacherSubjects[teacherId] || [];
  return mockSubjects.filter(subject => subjectIds.includes(subject.id));
};

export const getStudentSubjects = (studentId: string): Subject[] => {
  const subjectIds = studentSubjects[studentId] || [];
  return mockSubjects.filter(subject => subjectIds.includes(subject.id));
};

export const assignSubjectToTeacher = (teacherId: string, subjectId: string): void => {
  if (!teacherSubjects[teacherId]) {
    teacherSubjects[teacherId] = [];
  }
  if (!teacherSubjects[teacherId].includes(subjectId)) {
    teacherSubjects[teacherId].push(subjectId);
  }
};

export const updateSubjectTopic = (subjectId: string, topicId: string, updatedTopic: Topic): boolean => {
  const subject = getSubjectById(subjectId);
  if (!subject || !subject.topics) return false;
  
  const topicIndex = subject.topics.findIndex(topic => topic.id === topicId);
  if (topicIndex === -1) return false;
  
  subject.topics[topicIndex] = { ...subject.topics[topicIndex], ...updatedTopic };
  return true;
};

export const addTopicToSubject = (subjectId: string, newTopic: Omit<Topic, 'id'>): Topic | null => {
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  
  if (!subject.topics) {
    subject.topics = [];
  }
  
  const topicId = `topic-${subjectId}-${subject.topics.length + 1}`;
  const topic: Topic = {
    id: topicId,
    ...newTopic
  };
  
  subject.topics.push(topic);
  return topic;
};

export const removeTopicFromSubject = (subjectId: string, topicId: string): boolean => {
  const subject = getSubjectById(subjectId);
  if (!subject || !subject.topics) return false;
  
  const initialLength = subject.topics.length;
  subject.topics = subject.topics.filter(topic => topic.id !== topicId);
  
  return subject.topics.length < initialLength;
};

export const getTopicById = (subjectId: string, topicId: string): Topic | undefined => {
  const subject = getSubjectById(subjectId);
  if (!subject || !subject.topics) return undefined;
  
  return subject.topics.find(topic => topic.id === topicId);
};

export const addResourceToTopic = (
  subjectId: string, 
  topicId: string, 
  newResource: Omit<Resource, 'id' | 'topicId'>
): Resource | null => {
  const topic = getTopicById(subjectId, topicId);
  if (!topic) return null;
  
  const resourceId = `resource-${topicId}-${topic.resources.length + 1}`;
  const resource: Resource = {
    id: resourceId,
    topicId,
    ...newResource
  };
  
  topic.resources.push(resource);
  return resource;
};

export const removeResourceFromTopic = (
  subjectId: string,
  topicId: string,
  resourceId: string
): boolean => {
  const topic = getTopicById(subjectId, topicId);
  if (!topic) return false;
  
  const initialLength = topic.resources.length;
  topic.resources = topic.resources.filter(resource => resource.id !== resourceId);
  
  return topic.resources.length < initialLength;
};
