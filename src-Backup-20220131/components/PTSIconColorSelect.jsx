const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const PTSIconColorSelect = (props) => {

    return (
        <div>
            <SelectControl
                label={ __( 'Icon Farbe', 'wf-block' ) }
                value={ props.value }
                onChange={props.onChangeBGColor}
                options={ [
                    { value: 'color-white', label: 'Weiß' },
                    { value: 'color-black', label: 'Schwarz' },
                    { value: 'color-pts-violett', label: 'PTS Violett' },
                    { value: 'color-pts-blau', label: 'PTS Blau' },
                    { value: 'color-pts-hellblau', label: 'PTS Hellblau' },
                    { value: 'color-pts-dunkelblau', label: 'PTS Dunkelblau' }
                ] }
            />
        </div>
    )
}

export default PTSIconColorSelect;