import React, { useState, useEffect } from 'react';

function PostForm({ post, categoryOptions, onSave, onCancel }) {
    const initializeState = () => ({
        title: post?.title || '',
        content: post?.content || '',
        categories: post?.categories || [],
    });

    const [state, setState] = useState(initializeState);

    useEffect(() => {
        setState(initializeState());
    }, [post]);

    const toggleCategory = (value, checked) => {
        setState(prevState => {
            const newCategories = checked
                ? [...prevState.categories, value]
                : prevState.categories.filter(category => category !== value);
            return { ...prevState, categories: newCategories };
        });
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            toggleCategory(value, checked);
        } else {
            setState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, content, categories } = state;

        if (!title || !content || categories.length === 0) {
            alert("Title, content, and at least one category are required.");
            return;
        }

        onSave?.({ ...state, id: post?.id }, Boolean(post?.id));
        resetForm();
    };

    const resetForm = () => {
        setState(initializeState);
        onCancel?.();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    value={state.content}
                    onChange={handleInputChange}
                />
            </div>
            <fieldset>
                <legend>Categories:</legend>
                {categoryOptions.map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            name="categories"
                            value={option}
                            checked={state.categories.includes(option)}
                            onChange={handleInputChange}
                        />
                        {option}
                    </label>
                ))}
            </fieldset>
            <button type="submit">Submit</button>
            <button type="button" onClick={resetForm}>Clear</button>
        </form>
    );
}

export default PostForm;