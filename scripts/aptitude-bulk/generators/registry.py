"""Registry of all quantitative topic generators."""
from generators.number_system import gen_number_system
from generators.algebra_advanced import GENERATORS as AA
from generators.commercial import GENERATORS as CM
from generators.interest import GENERATORS as IN
from generators.number_basics import GENERATORS as NB
from generators.ratio_mixture import GENERATORS as RM
from generators.work_speed import GENERATORS as WS

ALL_GENERATORS = {
    "number-system": gen_number_system,
    **NB,
    **CM,
    **RM,
    **IN,
    **WS,
    **AA,
}
