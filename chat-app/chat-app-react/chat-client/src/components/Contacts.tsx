import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'


interface ContactsProps {
    contacts: any[];
    currentUser: any;

}
const Contacts:React.FC<ContactsProps> = ({currentUser,contacts}) => {
    const [currentUserName,setCurrentUserName] = useState<string>('');
    const [currentUserImage,setCurrentUserImage] = useState<string>('');
    const [currentUserSelected,setCurrentUserSelected] = useState<string>('');

    useEffect(() => {
        if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changeCurrentChat = (index:number,contact:any) => {
        setCurrentUserSelected(contact._id);

    }
  return (
    <>
    {currentUserImage && currentUserName(
        <Container>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h3>Snappy</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact) => (
                    
                ))}
            </div>
        </Container>
    )}
    </>
  )
}

export default Contacts