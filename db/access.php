<?php
$capabilities = array(
    'local/inlinetrainer:usetrainer' => array(
        'captype' => 'write',
        'contextlevel' => CONTEXT_SYSTEM,
        'archetypes' => array(
        )
    ),
    'local/inlinetrainer:researchtrainer'=>array(
        'captype'=>'write',
        'contextlevel' => CONTEXT_SYSTEM,
        'riskbitmask' => RISK_PERSONAL,
    )
);