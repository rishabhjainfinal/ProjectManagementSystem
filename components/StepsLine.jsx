import { Steps } from 'rsuite';

const StepsLine = ({current}) => {
    return (
        <Steps current={current}>
            <Steps.Item title="Card-1" description="User Basic Info" />
            <Steps.Item title="Card-2" description="User Login Credentials" />
            <Steps.Item title="Card-3" description="User Identifiers" />
        </Steps>
    );

}

export default StepsLine;