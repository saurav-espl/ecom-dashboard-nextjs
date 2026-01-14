import React from 'react';
// import CertificateForm from '@/pages/components/certificateform';
import Servicelist from '@/pages/components/Servicelist';

const service = () => {
  return (
    <div>
      {/* <CertificateForm /> */}
      <Servicelist limit={5}/>
    </div>
  )
}

export default service