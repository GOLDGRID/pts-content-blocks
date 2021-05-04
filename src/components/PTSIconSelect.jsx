const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const PTSIconSelect = (props) => {

    return (
        <div>
            <SelectControl
                label={ __( 'Icon', 'wf-block' ) }
                value={ props.value }
                onChange={props.onChangeIcon}
                options={ [
                    { value: '', label: 'Kein Icon' },
                    { value: 'icon-01', label: 'Icon 1' },
                    { value: 'icon-02', label: 'Icon 2' },
                    { value: 'icon-03', label: 'Icon 3' },
                    { value: 'icon-04', label: 'Icon 4' },
                    { value: 'icon-05', label: 'Icon 5' },
                    { value: 'icon-06', label: 'Icon 6' },
                    { value: 'icon-07', label: 'Icon 7' }
                ] }
            />
        </div>
    )
}

export default PTSIconSelect;