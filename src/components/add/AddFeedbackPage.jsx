import './add-feedback-page.scss';
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import BackBtn from '../back-btn/BackBtn';
import Select from '../select/Select';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const AddFeedBackPage = () => {
    const navigate = useNavigate();
    const options = useSelector(state => state.tags);
    const [category, setCategory] = useState('UI');
    const [selectVisible, setSelectVisible] = useState(false);

    const handleOptionSelect = (e) => {
        const category = e.target.textContent;
        setCategory(category);
    }

    const handleOpenSelectClick = () => {
        const isVisible = selectVisible;
        setSelectVisible(!isVisible);
    }

    const handleAddFeedbackFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        await addDoc(collection(db, "feedback"), {
            title: form.title.value,
            description: form.description.value,
            category: category,
            upvotes: 0,
            status: 'suggestion',
            comments: 0,
            upvotedby: []
        }).then(() => navigate('/'));
    }

    return(
        <div className="page">
            <BackBtn/>
            <div className="page__body">
                <img className='page__icon' src="/add-feedback-icon.png" alt="shiny icon" />
                <h1 className="page__title">Create New Feedback</h1>
                <form className="form" onSubmit={handleAddFeedbackFormSubmit}>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="title">Feedback title</label>
                        <span className="form__element-description">Add a short, descriptive headline</span>
                        <input className="form__input" type="text" name='title' id='title' maxLength={40} required/>
                    </div>
                    <div className="form__element">
                        <span className="form__element-title">Category</span>
                        <span className="form__element-description">Choose a category for your feedback</span>
                        <div className='form__select select-label' onClick={handleOpenSelectClick}>
                            <span className='form__select-value'>{category} <img className={selectVisible ? 'select-arrow select-arrow_active' : 'select-arrow'} src="/arrow-select-add.svg" alt="select arrow"/></span>
                            {
                                selectVisible && <Select
                                    options={options}
                                    currentValue={category}
                                    setSelectVisible={setSelectVisible}
                                    onClick={handleOptionSelect}/>
                            }
                        </div>
                    </div>
                    <div className="form__element">
                        <label className="form__element-title" htmlFor="description">Feedback Detail</label>
                        <span className="form__element-description">Include any specific comments on what should be improved, added, etc.</span>
                        <textarea className="form__input" type="text" name='description' id='description' maxLength={75} required/>
                    </div>

                    <div className='form__buttons'>
                        <button type='submit' className='form__btn form__btn_accept'>Add Feedback</button>
                        <Link className='form__btn' to='/'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFeedBackPage;