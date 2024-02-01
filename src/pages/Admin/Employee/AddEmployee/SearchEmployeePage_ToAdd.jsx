import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { toast } from 'react-hot-toast';

const SearchEmployeePage_ToAdd = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    function trimObjectFields(obj) {
        const trimmedObject = {};
        
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (typeof value === 'string') {
            const trimmedValue = value.trim();
            if (trimmedValue !== '') {
              trimmedObject[key] = trimmedValue;
            }
          } else {
            trimmedObject[key] = value;
          }
        });
      
        return trimmedObject;
      }

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const onSubmit = (data) => {
      
        const trimmedData = trimObjectFields(data);
      
        if (isObjectEmpty(trimmedData)) {
            toast.error('No data inserted');
            return;
        }

     
    }

    return (
        <section>
            <SetTitle title="Add Employee" />
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-7xl mx-auto flex flex-col items-center py-12 select-none ' autoComplete='off'>
                <SectionTitle h1="Search Employee" />
                <div className="w-full md:w-3/4 p-3 mt-8">
                    <div className="p-6 h-full border border-gray-100 overflow-hidden bg-white rounded-md shadow-dashboard border-gray-500/50">
                        <div className="flex flex-wrap pb-3 -m-3">
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">First name</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="John"
                                    {...register("f_name")} />
                                {errors.f_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.f_name.message}</p>)}

                            </div>
                            {/* last name  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-4-3">Last name</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="text" placeholder="Doe"
                                    {...register("l_name")} />
                                {errors.l_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.l_name.message}</p>)}

                            </div>

                            {/* email  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-5-3">Email</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="email" placeholder="alex@example.com"
                                    {...register("email")} />
                                {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                                {errors.email?.type === "notEmail" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not an Email</p>)}

                            </div>

                            {/* phone  */}
                            <div className="w-full md:w-1/2 p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-6-3">Phone number</p>
                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input" type="tel" placeholder="01x xxx xxxx "
                                    {...register("mobile")} />
                                {errors.mobile?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.mobile.message}</p>)}
                                {errors.mobile?.type === "notPhone" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Not a phone number</p>)}

                            </div>





                            {/* NID  */}
                            <div className="w-full  p-3">
                                <label htmlFor="nid" className="mb-1.5 font-medium text-base text-gray-800">
                                    NID
                                </label>
                                <input
                                    id="nid"
                                    className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-400/40 rounded-lg shadow-input"
                                    type="text"
                                    placeholder="xxx xxxx xxxx xxx"
                                    {...register('nid')}
                                />
                                {errors.nid && (
                                    <p className='m-0 p-0 pl-1 text-base text-red-500 text-[9px]' role="alert">
                                        {errors.nid.message}
                                    </p>
                                )}
                            </div>

                            <button type='submit' className="relative flex flex-wrap justify-center w-full md:w-auto md:ml-auto  py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button pl-4 pr-8 mr-2">
                                <p data-config-id="auto-txt-22-3">Search</p>

                                <span className='absolute right-2 top-2'>
                                    <span className="sr-only">Search</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>


                    </div>
                </div>
            </form>
        </section>
    );
};

export default SearchEmployeePage_ToAdd;