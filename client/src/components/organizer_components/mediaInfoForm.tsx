import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-tailwind/react';
import { ChangeEvent, useState } from 'react';
import { mediaFormInterface, } from '../../types/organizerInterface';
import { addMediaEventInfo } from '../../api/organizer/organizer';
import { selectEvent } from '../../redux/reducers/eventSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { ChildComponentProps } from '../../pages/organizer_pages/eventAdding';


const MediaInfoForm = ({setActiveStep}:ChildComponentProps) => {
  const [images, setImages] = useState({
    images: [] as File[],
  });
  const event:any = useSelector(selectEvent)
  
  const initialValues = {
    videoURL: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().max(400).min(20).required('Description is required'),
    videoURL:Yup.string().url('Please enter a valid URL').required('URL is required'),
  });

  const handleSubmit = async(values:mediaFormInterface) => {
    const formData = new FormData();
    formData.append('description', values?.description);
    formData.append('videoURL', values?.videoURL);
    event && formData.append('eventId',event.eventDetails._id)
    images?.images.forEach((image,index) => {
      formData.append(`images`, image,`images${index}`);
    });
    const res = await addMediaEventInfo(formData)
    if(res?.data.message){
      setActiveStep(2)
    }
    
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedImages = Array.from(event.target.files);
      setImages({
        ...images,
        images: selectedImages,
      });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="mx-12" encType="multipart/form-data">
        <div className="mt-7">
          <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Images
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Add photos to show what your event will be about. You can upload up to 5 images.
          </p>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <Field
                id="dropzone-file"
                name="image"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <ErrorMessage name="image" component="div" className="text-red-500" />
            </label>
          </div>
        </div>

        <div className="mt-10">
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Video
            </h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">
              Add a video link from Youtube or Vimeo to show your event's vibe. The video will appear with your event images.
            </p>
          </div>
          <div>
            <label
              htmlFor="videoURL"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Video URL
            </label>
            <Field
              type="text"
              id="videoURL"
              name="videoURL"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="videoURL" component="div" className="text-red-500" />
          </div>
        </div>

        <div className="mt-10">
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Description
            </h2>
            <p className="mb-3 text-gray-500 dark:text-gray-400">
              Add more details to your event like your schedule, sponsors, or featured guests.
            </p>
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Short description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a description about this event..."
            />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button size="sm" color="blue" variant="outlined" className="mt-3 w-28 mr-3">Discard</Button>
          <Button type="submit" size="sm" color="red" className="mt-3 w-28 ">Save</Button>
          </div>
      </Form>
    </Formik>
  );
};

export default MediaInfoForm
