const { __ } = wp.i18n;
const { SelectControl } = wp.components;

const PTSBGColorSelect = (props) => {

    return (
        <div>
            <SelectControl
                label={ __( 'Hintergrundfarbe Block', 'wf-block' ) }
                value={ props.value }
                onChange={props.onChangeBGColor}
                options={ [
                    { value: 'bg-pts-white', label: 'Weiß' },
                    { value: 'bg-pts-violett', label: 'PTS Violett' },
                    { value: 'bg-pts-blau', label: 'PTS Blau' },
                    { value: 'bg-pts-hellblau', label: 'PTS Hellblau' },
                    { value: 'bg-pts-dunkelblau', label: 'PTS Dunkelblau' },
                    { value: 'bg-pts-gradient', label: 'PTS Verlauf' }
                ] }
            />
        </div>
    )
}

export default PTSBGColorSelect;