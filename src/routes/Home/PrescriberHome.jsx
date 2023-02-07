import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import "./prescriberHome.css";

import { Button } from '@patternfly/react-core';
import { SimpleList, SimpleListItem, SimpleListGroup } from '@patternfly/react-core';
import { Link } from "react-router-dom";

const PrescriberHome = () => {

  return (
    <section>
      <SimpleList>
        <SimpleListGroup title="Patients" id="patients">
          <SimpleListItem id="add-patient">
            <Button
              icon={<AiOutlinePlusCircle />}
              variant='link'
              component={(_) => <Link to='addPatient'{..._} />}>Add Patient
            </Button>
            </SimpleListItem>
            <SimpleListItem id="find-patient">
            <Button
              icon={<AiOutlineSearch />}
              variant='link'
              component={(_) => <Link to='findPatient'{..._} />}>Find Patient
            </Button>
          </SimpleListItem>
        </SimpleListGroup>
        <SimpleListGroup title='Prescriptions' id='prescriptions'>

          <SimpleListItem id="new-prescription">
            <Button
              icon={<AiOutlinePlusCircle />}
              variant='link'
              component={(_) => <Link to='newPrescription'{..._} />}>New Prescription
             </Button>
          </SimpleListItem>

          <SimpleListItem id="find-prescription">
            <Button
              icon={<AiOutlineSearch />}
              variant='link'
              component={(_) => <Link to='findPrescription'{..._} />}>Find Prescription
            </Button>
          </SimpleListItem>

        </SimpleListGroup>
      </SimpleList>

    </section>
  );
};

export default PrescriberHome;
